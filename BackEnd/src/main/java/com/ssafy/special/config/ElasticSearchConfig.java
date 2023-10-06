package com.ssafy.special.config;


import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.RestClients;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

import java.io.InputStream;
import java.security.KeyStore;

@Configuration
@EnableElasticsearchRepositories // elasticsearch repository 허용
public class ElasticSearchConfig extends AbstractElasticsearchConfiguration {
    @Value("${elasticsearch.host}")
    private String hostname;

    @Value("${elasticsearch.port}")
    private Integer port;

    @Value("${esdata.user}")
    private String id;

    @Value("${esdata.keys}")
    private String keys;


    @Override
    public RestHighLevelClient elasticsearchClient() {
        ClientConfiguration clientConfiguration = ClientConfiguration.builder()
                .connectedTo(hostname + ":" + port)
                .withBasicAuth(id, keys)
                .build();
        return RestClients.create(clientConfiguration).rest();
    }
}