package com.ong.backend.services;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.oned.EAN13Writer;
import com.ong.backend.models.Lote;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class EtiquetaService {

    private final LoteService loteService;

    @Transactional(readOnly = true)
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
        String tituloLote = "LOTE #" + lote.getId();
        int xTitulo = (largura - g2d.getFontMetrics().stringWidth(tituloLote)) / 2;
        g2d.drawString(tituloLote, xTitulo, yPos);
        yPos += lineHeight;
        
        g2d.setFont(new Font("Arial", Font.PLAIN, (int)(fontSize * 0.67)));
        String quantidade = "Quantidade Total: " + lote.getQuantidadeAtual() + " unidades";
        g2d.drawString(quantidade, margin, yPos);
        yPos += lineHeight;
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        String dataEntrada = "Entrada: " + lote.getDataEntrada().format(formatter);
        g2d.drawString(dataEntrada, margin, yPos);
        yPos += lineHeight + 10;
        
        g2d.setFont(new Font("Arial", Font.BOLD, (int)(fontSize * 0.6)));
        g2d.drawString("Produtos:", margin, yPos);
        yPos += (int)(lineHeight * 0.8);
        
        g2d.setFont(new Font("Arial", Font.PLAIN, (int)(fontSize * 0.5)));
        for (var item : lote.getItens()) {
            String produtoInfo = "• " + truncate(item.getProduto().getNome(), 25) + " (" + item.getQuantidade() + ")";
            g2d.drawString(produtoInfo, margin + 10, yPos);
            yPos += (int)(lineHeight * 0.7);
            
            if (yPos > altura - barcodeHeight - 120) break;
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
