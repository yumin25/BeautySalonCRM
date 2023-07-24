package com.salon.beauty.model.dto.response.shop;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 메인 스타일 조회 조회 응답을 처리하는 DTO
 */
@Builder
@Getter
@Setter
@ToString
public class MainStyleRetrieveResponseDTO {
    // 스타일 id
    private String styleId;

    // 스타일 이름
    private String styleName;

    // 스타일 순서
    private int styleOrder;
}