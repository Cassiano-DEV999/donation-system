package com.ong.backend.services;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.oned.Code128Writer;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.ong.backend.models.Lote;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EtiquetaService {

    private final LoteService loteService;

    @Transactional(readOnly = true)
    public byte[] gerarEtiqueta(Long loteId, String tamanho) throws Exception {
        return new byte[0];
    }

    @Transactional(readOnly = true)
    public byte[] gerarEtiquetasEmLotePDF(List<Long> loteIds) throws Exception {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4, 20, 20, 20, 20); // Margens de 20mm
        PdfWriter.getInstance(document, baos);

        document.open();

        PdfPTable table = new PdfPTable(3);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);
        table.setSpacingAfter(10f);

        for (Long id : loteIds) {
            Lote lote = loteService.buscarEntidadePorId(id);
            PdfPCell cell = criarCelulaEtiqueta(lote);
            table.addCell(cell);
        }

        int celulasFaltantes = (3 - (loteIds.size() % 3)) % 3;
        for (int i = 0; i < celulasFaltantes; i++) {
            PdfPCell emptyCell = new PdfPCell();
            emptyCell.setBorder(Rectangle.NO_BORDER);
            table.addCell(emptyCell);
        }

        document.add(table);
        document.close();

        return baos.toByteArray();
    }

    private PdfPCell criarCelulaEtiqueta(Lote lote) throws Exception {
        PdfPCell cell = new PdfPCell();
        cell.setBorder(Rectangle.BOX);
        cell.setBorderWidth(1f);
        cell.setPadding(8f);
        cell.setFixedHeight(100f);

        Font fontTitulo = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 9);
        Paragraph pTitulo = new Paragraph("LOTE #" + lote.getId(), fontTitulo);
        pTitulo.setAlignment(Element.ALIGN_CENTER);
        cell.addElement(pTitulo);

        Font fontInfo = FontFactory.getFont(FontFactory.HELVETICA, 7);
        String resumoProdutos = lote.getItens().isEmpty() ? "Vazio" : lote.getItens().get(0).getProduto().getNome();

        if (resumoProdutos.length() > 25) {
            resumoProdutos = resumoProdutos.substring(0, 25) + "...";
        } else if (lote.getItens().size() > 1) {
            resumoProdutos += " +" + (lote.getItens().size() - 1);
        }

        Paragraph pInfo = new Paragraph(resumoProdutos, fontInfo);
        pInfo.setAlignment(Element.ALIGN_CENTER);
        cell.addElement(pInfo);

        Paragraph pQtd = new Paragraph("Qtd: " + lote.getQuantidadeAtual() + " " + lote.getUnidadeMedida(), fontInfo);
        pQtd.setAlignment(Element.ALIGN_CENTER);
        cell.addElement(pQtd);

        String conteudoBarcode = "L-" + lote.getId();
        Image barcodeImage = gerarImagemBarcode(conteudoBarcode);

        barcodeImage.scalePercent(65);
        barcodeImage.setAlignment(Element.ALIGN_CENTER);
        barcodeImage.setSpacingBefore(3f);

        cell.addElement(barcodeImage);

        return cell;
    }

    private Image gerarImagemBarcode(String texto) throws Exception {
        Code128Writer writer = new Code128Writer();
        BitMatrix matrix = writer.encode(texto, BarcodeFormat.CODE_128, 180, 40);

        BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(matrix);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        javax.imageio.ImageIO.write(bufferedImage, "png", baos);
        return Image.getInstance(baos.toByteArray());
    }
}