package com.ssafy.special.CSR.repositories;

import com.ssafy.special.entity.S3File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface S3Repository extends JpaRepository<S3File, Long> {
    void deleteByUploadFileUrl(String imgSrc);


}
