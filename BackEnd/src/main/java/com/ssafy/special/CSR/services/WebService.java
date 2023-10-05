package com.ssafy.special.CSR.services;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyExtractor;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@NoArgsConstructor
public class WebService {

    public boolean revokeToken(String base, String token) {
        WebClient webClient;
        ClientResponse response;

        System.out.println("기준 URL:" + base + "\n토큰:" + token);
        if(base.equals("GOOGLE")) {
            webClient = WebClient.builder().baseUrl("https://oauth2.googleapis.com").build();
            response = webClient.post()
                    .uri(uriBuilder -> uriBuilder.path("/revoke")
                            .queryParam("token", token)
                            .build())
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .exchangeToMono(Mono::just)
                    .block();
        }
        else {
            webClient = WebClient.builder().baseUrl("https://kapi.kakao.com").build();
            response = webClient.post()
                    .uri(uriBuilder -> uriBuilder.path("/v1/user/unlink")
                            .build())
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .header("Authorization", "Bearer " + token)
                    .exchangeToMono(Mono::just)
                    .block();
        }


        if (response != null) {
            HttpStatus statusCode = response.statusCode();
            // 이제 statusCode 객체를 사용하여 상태 코드를 확인할 수 있습니다.
            String json = response.bodyToMono(String.class).block();
            if (statusCode.is2xxSuccessful()) {
                // 성공적인 응답 처리
                System.out.println("성공이요;");
                return true;
            } else {
                // 오류 응답 처리
                System.out.println(json);
                System.out.println("실패요;");
                return false;
            }
        } else {
            System.out.println("없어요;");
            return false;
        }
    }
}