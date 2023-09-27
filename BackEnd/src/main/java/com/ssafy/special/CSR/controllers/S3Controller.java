package com.ssafy.special.CSR.controllers;

import com.ssafy.special.CSR.services.S3Service;
import com.ssafy.special.enums.UploadType;
import com.ssafy.special.exception.DataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/img")
public class S3Controller {
    private final S3Service s3UploadService;

    @PostMapping("/profile")
    public ResponseEntity<?> uploadProfile(@RequestPart("image") MultipartFile multipartFile) throws IOException {
        return ResponseEntity.ok(s3UploadService.upload(UploadType.USERPROFILE, multipartFile));
    }

    // 레시피를 받ㅅ
    @PostMapping("/recipe")
    public ResponseEntity<?> uploadRecipe(@RequestPart("image") MultipartFile multipartFile) throws IOException {
        return ResponseEntity.ok(s3UploadService.upload(UploadType.RECIPE, multipartFile));
    }
//
//    @DeleteMapping
////    public DataResponse<?> deleteRecipe
}