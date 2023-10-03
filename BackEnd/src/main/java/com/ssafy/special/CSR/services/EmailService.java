package com.ssafy.special.CSR.services;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.special.CSR.dtos.email.EmailDto;
import com.ssafy.special.CSR.dtos.email.EmailProductDto;
import com.ssafy.special.CSR.dtos.memberpick.MemberPickProdInfoDto;
import com.ssafy.special.CSR.dtos.product.EventInfoDto;
import com.ssafy.special.CSR.dtos.product.ProductInfoDto;
import com.ssafy.special.CSR.repositories.MemberPickProdRepository;
import com.ssafy.special.entity.Member;
import com.ssafy.special.exception.CustomErrorCode;
import com.ssafy.special.exception.CustomException;
import com.ssafy.special.member.model.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final MemberRepository memberRepository;
    private final MemberPickProdRepository memberPickProdRepository;


    private MimeMessage createMessageProductEvent(String to, String name, List<EmailProductDto> productList) throws Exception{

        MimeMessage  message = javaMailSender.createMimeMessage();
        message.addRecipients(Message.RecipientType.TO, to);    //보내는 사람 설정
        message.setSubject("[편할래] "+name+"님! 찜 상품이 할인중입니다!");

        StringBuilder msgg = new StringBuilder();
        msgg.append(" <table style='width: 100% !important; background: #ffffff; margin: 0; padding: 0; min-width: 100%'> ");
        msgg.append(" <tr> <td style='text-align: center'> ");
        msgg.append(" <img src='https://damda.s3.ap-northeast-2.amazonaws.com/EMAIL_CONFIRM/EMAIL_CONFIRM.png' alt='header' loading='lazy' /> </td></tr>" );
        msgg.append(" <tr> <td style='text-align: center'> ");
        msgg.append(" <h2 style='margin: 0px; font-size: 45px; margin-top: 20px'>편할래</h2> ");
        msgg.append(" <h3 style='margin: 0px; font-size: 15px'>편의점 할인 레시피</h3> <br /> ");
        msgg.append(" <p style='margin: 0px auto 10px auto; width: 700px; height: 30px'>").append(name).append("회원님의 찜 상품 할인정보</p> ");
        msgg.append(" <div style='display: grid; grid-template-columns: repeat(3, minmax(0, 170px)); width: 600px; justify-content: center; margin: 0px auto 20px auto; place-items: center; border-bottom: 1px solid #D5D5D5; border-top: 1px solid #D5D5D5; grid-row-gap: 15px; padding: 20px;'>");

        for(EmailProductDto product : productList){
            msgg.append(" <div style='width: 130px; height: 170px; overflow: hidden; box-shadow: 0px 0px 2px #0000003f'> ");
            msgg.append(" <div style='margin: 0px; height: 130px'>");
            msgg.append(" <img style='width: 100%; height: 130px;' src='").append(product.getProductImg()).append("'/> </div>");
            msgg.append(" <div style='font-size: 13px; padding: 3px 4px;  background-color: #f7f7f7;  height: 40px; margin: 0px;  font-weight: bold;'>").append(product.getProductName());
            msgg.append(" </div></div>");
        }

        msgg.append("</div></td></tr><tr><td><div style=' width: 600px; margin: 10px auto 0px auto; text-align: center'>  ");
        msgg.append("더 많은 정보는 편할래 사이트를 접속해주세요! </div>");
        msgg.append("<div style='width: 600px; margin: 20px auto; text-align: center'>");
        msgg.append("<a href='https://pnale.online/'>편할래 바로가기</a> </div> </td></tr>");
        msgg.append(" <tr> <td style='text-align: center'> ");
        msgg.append(" <img src='https://damda.s3.ap-northeast-2.amazonaws.com/EMAIL_CONFIRM/EMAIL_CONFIRM.png' alt='footer' loading='lazy' /> ");
        msgg.append(" </td></tr></table>");

        message.setText(msgg.toString(), "utf-8", "html");
        message.setFrom(new InternetAddress("pnaleoffcial@gmail.com","편할래"));//보내는 사람

        return message;
    }

    public void sendMail() {
        //유저 리스트 mail_receive 설정한 유저
        Optional<List<Member>> memberListOptional = memberRepository.findByMailReceiveTrue();

        //리스트가 있을때만 실행해!
        memberListOptional.ifPresent(memberList -> {
            for(Member member : memberList ){
                Optional<List<EmailProductDto>> mailLikeListOptional = memberPickProdRepository
                        .findByMember_MemberIdAndLikeStatTrueAndReceivedTrue(PageRequest.of(0,6),member.getMemberId())
                        .map(Slice::getContent);
                mailLikeListOptional.ifPresent(mailLikeList -> {
                    try {
                        MimeMessage message = createMessageProductEvent(member.getEmail(), member.getNickname(), mailLikeList);
                        javaMailSender.send(message);   
                    } catch (Exception e) {
                        log.info("메일 전송 실패");
                        throw new RuntimeException(e);
                    }
                });
            };

        });
    }
}
