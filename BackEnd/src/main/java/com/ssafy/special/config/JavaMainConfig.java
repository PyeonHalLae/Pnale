package com.ssafy.special.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class JavaMainConfig {

    @Value("${mail.host}")
    String smtpHost;
    @Value("${mail.username}")
    String smtpUserName;
    @Value("${mail.password}")
    String smtpPassword;
    @Value("${mail.port}")
    int smtpPort;

    @Bean
    public JavaMailSender javaMailService() {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();

        javaMailSender.setHost(smtpHost);
        javaMailSender.setUsername(smtpUserName);
        javaMailSender.setPassword(smtpPassword);

        javaMailSender.setPort(smtpPort);

        javaMailSender.setJavaMailProperties(getMailProperties());

        return javaMailSender;
    }

    private Properties getMailProperties() {
        Properties properties = new Properties();
        properties.setProperty("mail.transport.protocol", "smtp");
        properties.setProperty("mail.smtp.auth", "true");
        properties.setProperty("mail.smtp.timeout", "3000");
        properties.setProperty("mail.smtp.starttls.enable", "true");
        return properties;
    }

}
