package com.ssafy.special.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    @Bean //모델메퍼를 빈으로 등록해준다. 선언만 하면 잊 ㅔ사용할 수 있게 됨
    public ModelMapper modelMapper() {return new ModelMapper();}
}
