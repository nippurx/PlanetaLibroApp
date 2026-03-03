export type MockBook = {
  libro_uri: string;
  titulo: string;
  autor: string;
  narrator: string;
  tags: string[];
  pages_total: number;
  current_page: number;
  has_audio: boolean;
  youtube_video_id: string;
  sinopsis: string;
  portada: string;
  portada_alt: string;
  cover_landscape: string;
  current_chapter: string;
  progress_percent: number;
};

export const mockBook: MockBook = {
  libro_uri: "el-nombre-del-viento",
  titulo: "El nombre del viento",
  autor: "Patrick Rothfuss",
  narrator: "Mike Grady",
  tags: ["Fantasía épica", "Eco-friendly", "Audiolibro"],
  pages_total: 662,
  current_page: 231,
  has_audio: true,
  youtube_video_id: "dQw4w9WgXcQ",
  sinopsis:
    "En una posada en tierra de nadie, un hombre se dispone a relatar, por primera vez, la auténtica historia de su vida. Una historia que únicamente él conoce y que ha quedado diluida tras los rumores, las conjeturas y los cuentos de taberna que le han convertido en un personaje legendario.",
  portada:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDVIgYrm0R68EL8GAtiR1To9P8QG2A7pwZaUsv_MT8xY5xCf913N7tEP71ftzJ4SJyAkMJKpi9A28unm4q9OXq22jK0XPKss2U2oY3fFuk8dNhmoXiC4jf4v7buBr2RLG1wHg53n33AuRILRvyhKpoIhZy5bJUtbCOJ5Hozx0dG6wEz77phuLPdH2BkmqDCJReN074nhH9pfE31ej4Eqh6yg7wDltASkC5gVggbS7N9ljV3WJnA_xascwFv0H8ZBLF7vj1t0k7qNfpW",
  portada_alt: "Portada de El nombre del viento",
  cover_landscape:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDWXH4vJee3_yHdNacwy1XIkGSx_EPn30VEuDnIY8J52Gxgzk5HmwYbVcCUELs_OCVQGUthWFhKTVlmUpsHLTeTzVQKmWWR51L-VIr0lG9Jj9-cv21fBRZBUPzVmVkc8tizel9WaMYZQGrbMj8oiNgPMFLH_upDqN1Z0avxJ5Gwrt3IEEB39EI0ftOgDehWqmsPlxRGhpeBUKUHD_aEK3d002eTlD-oT0_wLu1gWfO-pmhn5UnSQxkdd590EaSHXaEKuo2Q-3O962fw",
  current_chapter: "Capítulo 7",
  progress_percent: 35,
};

export const recommendationBooks = [
  {
    titulo: "Hábitos Atómicos",
    autor: "James Clear",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAZHeaiT6BGQijLE2Vt2FuIpfGE9m2tVAdENvCGpbGrI9KT9K1jFf0rt2MJeHTds2kiRFcEu3LEioDblOVZql36vM8KEIbTI-NNjQAmgV0TrQfHvszsiEFcRJPezpFXqZKbMIX-i1C8VddEOguKLmoPx4V_k81RHSRYZYB5s_F_OXO_XMs9z1pEu34r4dD5eWN6U89Fy7Jj4VW95-eSydFhSXn5hU_IP2pDrwWOzqHHKRB2OhHAZBRdackYS1LUAoQ7Obl8b5VEKD_r",
    score: "4.8",
  },
  {
    titulo: "Sapiens",
    autor: "Yuval Noah Harari",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAFBsaWfM5vUMrcGonQDV3ApI8pcsKG2mPpWg-WN9BQA7acS-Jsn0GeOvrQfcUmmPZS7T9pCxYCJ7gPUzp6GC3v-07lCSjHp-m8QtF5SFH-8zIUSpdLpouTjQi8VBi4QINFeDj4aybO5DlhlbKAkox-J9Jb2xEPDi2UbSqHphII3GeZsdd8r5HR7dZ9aF0wHMGeQwyQrNRc4lNEqHXdA4V9MnshDXE3T4Q_7mWSsDnFhaGdEGY0zZgPq1_HWwyShVJ7zYQiRKfLJFY7",
    score: "4.9",
  },
  {
    titulo: "Dune",
    autor: "Frank Herbert",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC8AYtQ-Iio8OdahgnFqAegmc_HsUd9oUhLr3ngJtSAlULDKPKxxSbDWP58QItjG39AgXcySs5w1k1sn68Pnrq1tiJ3eSSgk2pfJhzU5fTT32wljT_-6ZrYarymdsqeonM0Enf76RGe5AvKTtuB_vM1kaEwPiuJl_vOgdavx-m_1IqZig_xJeKgrOrNVP1-JKoR3a1wem90Gunfhk4om15RdQF_09mQiz-T5B-AIFMhK0WfW86mspcANuR3123j6ni3GI4eX0vhozlW",
    score: "4.5",
  },
  {
    titulo: "1984",
    autor: "George Orwell",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCkuQgO7Nm8E5VeK0mMJqBV5cyPfWOp8D5R3zSlJondurNNrZwpaxpfFl3KPheNKRihJu-1EKQ5RdCldgT-rQoo92wmqgEwPRjUuRnw6EpeQC183wT_oHu-SlDq43ux7k2Zp5cJOUlKuyFqQe1eQXH65Y596o0vEiUMr0Mo9_HsBHVpqOSkx9jAvw02aH1IpYciCtAUWYaf3ctcj8E-OmffK66TnSvcOsZJEBa8gzb69XOehIc3fK8l3ds8hAafNuUzYrrbOT9KL5Yh",
    score: "4.7",
  },
  {
    titulo: "Pensar rápido",
    autor: "Daniel Kahneman",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD61U3-wkCiEtC_9E89hNtedGxCQJy_8C0EPVBU0JE7KjmwIblmHsORghzKCQB6riTdRYyAB7ZWFCVX7LrLA7eMh2dIhsw22iVQocYtZmqNy9Ge6xufuTc4AEtWS9Ic-PpovTC2O9RdFcZ3qQcmpehv7BkGc3gu2XkFbUsFRIs_Xqc2w3XKBu-kkMQg3ReM7rz9ckQiRkqPAOWW04YqNT8P07veg21JyBacnaU8kr_oAW66Ci45vvusTLBioUH0kBExFRadeus6c0MU",
    score: "4.2",
  },
];

export const libraryBooks = [
  { titulo: "Cien años de soledad", autor: "Gabriel García Márquez", progreso: "65%", formato: "Audiolibro", accent: "amber", cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1xBxefnVbY9hQG0u5ArYY172ejWuRn-bR4Jfazw71fW_2qKQk6yP1op_-4D9qy1iRtSYSHlJkdx1S3pWxICE_15Lk9bvMJuznC4-90RyuMFxkzmor2KKydY1V8F3wQDiCjdbAVXzP8mrzjkMEczr1GYJ8QQhxm8FQES04RSeQ180vFYYglqeKQWdaksgZDAL0y-mIFVE92o4H7TrwkNgG7XmR4cKe0K8snq49aqZqfqOxv4AGP4RNbuNNyBG8kSH0TNpUk8dEtQio" },
  { titulo: "Sapiens", autor: "Yuval Noah Harari", progreso: "28%", formato: "Ebook", accent: "emerald", cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuAO1uXsuhdo82-Rpt8HGBTWRKMy8Le86XsCnmubvrmjZHj5EKtZEYPbAl74r8V4C2nQttqrA_mfzvYd7ycQe2AviivrMLcUtsKp-wntKfDr5Tl_nW2vC44W7ySvxVA7zMpHdX0g7kEPR9oJI7q6D1byYxC938jUPUDPCaslf4iUw7BcPiCT6AU8FmE0Uk64xN3qImMguJF00_TIKACeM24kJaATSNvYOLr81NLs5e_5oLekFI9IHb09I-SmKvWq7qgL4BptCyG19pwh" },
  { titulo: "Hábitos Atómicos", autor: "James Clear", progreso: "15%", formato: "Ebook", accent: "emerald", cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYAPSaiWsPHJ12GGfPaaU17Uf2uKDjE6zXGgkrXR0owgkYZmfWu5dlyha7LZHD0GPAEQ_OM5TQ0TRW8W2dSrsiq0zueqoKnDrEMwpzD0D1O2thYfI9a7tYFFtiuc1873lPzyPo0yvl5rfBHBqo7GtvAGCCd7uMFn3J6SeKosEzeLgh-QC0vVZV7pj5kg215rqXZac18-cOvZuKH1vyXdaSBpRML8L5Z07u5XzJQIhYDrgdotpu2lD0m1SD1YsNbAkp7VxeS70sUujd" },
];

export const recentMiniBooks = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD61U3-wkCiEtC_9E89hNtedGxCQJy_8C0EPVBU0JE7KjmwIblmHsORghzKCQB6riTdRYyAB7ZWFCVX7LrLA7eMh2dIhsw22iVQocYtZmqNy9Ge6xufuTc4AEtWS9Ic-PpovTC2O9RdFcZ3qQcmpehv7BkGc3gu2XkFbUsFRIs_Xqc2w3XKBu-kkMQg3ReM7rz9ckQiRkqPAOWW04YqNT8P07veg21JyBacnaU8kr_oAW66Ci45vvusTLBioUH0kBExFRadeus6c0MU",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAb5WxwmlX1oN-_Dkg7YUJBcxlE6n1qlgwW1-Azv4Yy9dT2bTHF_tfEfdpoPr_hEqw2wpTNVLo-x8uWHiYaI2GjmfUTfgJLrB1oev5x9VdzV-jBJ5l4G88F76yZMIJslEokCv7Ka9Ug6_ejFyewMvWWDCYgv5Ut2oTw9yL2xqQDSP_ojG6yy5kgeFAqF4agfSdueF1jslC2af4jirEcrwx9qAHb0micmftP2gAv3yrme_SxL8EVR1TgD5nquSn-xQuV4YMMB_5uggap",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCOkkhL2e1qJCx3y5WyfJjV0C17AxvQ_gafRzRQO4bfz5ENwZ7wcZh1L-EpRQ8CkQ-OQpRGqbrq_NVLwubaEzBZ6iLkSf_eV7TUMC1zG-r1R-vUVuqgQwngAcaT3KDopfDH9XHDHXEojasN4-tkeCNwaZFwqSesJDrP3Uk5nuTqQS_BIJFu4Bzq96zZ1NL2IKPm0Q4wDdbGCHGbBMw2CM4ujqUmLbnmViWZq0F-6JVoWmOTotK5_81EQQ3CilfRFGtkWgyGmU7xN7N4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBCPl6N6NE8I32U7XxFEgby8ifDOM7UA0vyw0qlg1cLo6HW9mk15nyJ1euDgAyhpXAsuRTpEuST9A2ghG_93Vci3JsWY-ytnEFl8awGPH2jGjn6NTECl3TsBsS5WupxM2FDjYSYobx4ZttyDWcllr2KXBlkbkH956ysNW5JGOPZpOSyadQjFziZjOeoHtHPHtWlNb1_0s-gel0Dg4R1NUs6otvldAi9GIIAamzZTWTSdLKC24p1RbF7Jh7FbRUA_Hf-BilKfnJ--ADL",
];
