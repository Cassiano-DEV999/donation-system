package com.ong.backend.services;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.oned.EAN13Writer;
import com.ong.backend.models.Lote;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class EtiquetaService {

    private final LoteService loteService;

    public byte[] gerarEtiqueta(Long loteId, String tamanho) throws Exception {
        Lote lote = loteService.buscarEntidadePorId(loteId);
        
        BufferedImage etiqueta = criarImagemEtiqueta(lote, tamanho);
        
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(etiqueta, "PNG", baos);
        return baos.toByteArray();
    }

    private BufferedImage criarImagemEtiqueta(Lote lote, String tamanho) throws Exception {
        int largura, altura;
        int fontSize, barcodeWidth, barcodeHeight;
        
        switch (tamanho.toUpperCase()) {
            case "PEQUENO":
                largura = 709;
                altura = 472;
                fontSize = 18;
                barcodeWidth = 200;
                barcodeHeight = 80;
                break;
            case "GRANDE":
                largura = 1417;
                altura = 945;
                fontSize = 48;
                barcodeWidth = 400;
                barcodeHeight = 120;
                break;
            case "MEDIO":
            default:
                largura = 1181;
                altura = 591;
                fontSize = 36;
                barcodeWidth = 300;
                barcodeHeight = 100;
                break;
        }
        
        BufferedImage imagem = new BufferedImage(largura, altura, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = imagem.createGraphics();
        
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g2d.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
        
        g2d.setColor(Color.WHITE);
        g2d.fillRect(0, 0, largura, altura);
        
        g2d.setColor(Color.BLACK);
        g2d.setStroke(new BasicStroke(3));
        g2d.drawRect(10, 10, largura - 20, altura - 20);
        
        int margin = 40;
        int yPos = 70;
        int lineHeight = (int)(fontSize * 1.2);
        
        g2d.setFont(new Font("Arial", Font.BOLD, fontSize));
        String nomeProduto = truncate(lote.getProduto().getNome(), 30);
        int xNome = (largura - g2d.getFontMetrics().stringWidth(nomeProduto)) / 2;
        g2d.drawString(nomeProduto, xNome, yPos);
        yPos += lineHeight;
        
        g2d.setFont(new Font("Arial", Font.PLAIN, (int)(fontSize * 0.67)));
        String categoria = "Categoria: " + lote.getProduto().getCategoria().getNome();
        g2d.drawString(categoria, margin, yPos);
        yPos += lineHeight;
        
        String quantidade = "Quantidade: " + lote.getQuantidadeAtual() + " unidades";
        g2d.drawString(quantidade, margin, yPos);
        yPos += lineHeight;
        
        if (lote.getDataValidade() != null) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            String validade = "Validade: " + lote.getDataValidade().format(formatter);
            g2d.setColor(Color.RED);
            g2d.setFont(new Font("Arial", Font.BOLD, (int)(fontSize * 0.67)));
            g2d.drawString(validade, margin, yPos);
            g2d.setColor(Color.BLACK);
            yPos += lineHeight;
        }
        
        g2d.setFont(new Font("Arial", Font.PLAIN, (int)(fontSize * 0.56)));
        
        if (lote.getTamanho() != null && !lote.getTamanho().isBlank()) {
            g2d.drawString("Tamanho: " + lote.getTamanho(), margin, yPos);
            yPos += (int)(lineHeight * 0.8);
        }
        
        if (lote.getVoltagem() != null && !lote.getVoltagem().isBlank()) {
            g2d.drawString("Voltagem: " + lote.getVoltagem(), margin, yPos);
            yPos += (int)(lineHeight * 0.8);
        }
        
        String codigoBarras = lote.getCodigoBarras();
        if (codigoBarras != null) {
            BufferedImage barcode = gerarCodigoBarras(codigoBarras, barcodeWidth, barcodeHeight);
            int xBarcode = (largura - barcode.getWidth()) / 2;
            int yBarcode = altura - barcodeHeight - 80;
            g2d.drawImage(barcode, xBarcode, yBarcode, null);
            
            g2d.setFont(new Font("Courier", Font.PLAIN, (int)(fontSize * 0.56)));
            int xCodigo = (largura - g2d.getFontMetrics().stringWidth(codigoBarras)) / 2;
            g2d.drawString(codigoBarras, xCodigo, altura - 40);
        }
        
        g2d.dispose();
        return imagem;
    }

    private BufferedImage gerarCodigoBarras(String codigo, int width, int height) throws Exception {
        EAN13Writer writer = new EAN13Writer();
        BitMatrix bitMatrix = writer.encode(codigo, BarcodeFormat.EAN_13, width, height);
        return MatrixToImageWriter.toBufferedImage(bitMatrix);
    }

    private String truncate(String text, int maxLength) {
        if (text == null) return "";
        return text.length() > maxLength ? text.substring(0, maxLength - 3) + "..." : text;
    }
}
