# AnimeMangaToons Backend
## Endpoints
### Authentication Endpoints  
- Post /auth/signup
![image](https://github.com/user-attachments/assets/26663525-bc53-45d5-b395-b52f2ce7474f)
- Post /auth/login
![image](https://github.com/user-attachments/assets/57f01234-fd2b-4502-8101-118398625ca2)

- Get /webtoons - get webtoons paginated
  query Parameters
  1. page : integer ( default 1 )
  2. take : integer ( default 10 )
- Get /webtoons/id_of_webtoon - get a Webtoon information 
- Post /webtoons - creates webtoon
  Headers should have
  - Authorisation : Bearer token
  - Example headers
  ![image](https://github.com/user-attachments/assets/e022e4fd-007e-4d77-ab15-892360cf8178)

  - Example Request
  ![image](https://github.com/user-attachments/assets/49837284-4d88-439a-9c02-2c7441424a79)
- Delete /webtoons/id - delete webtoon
  - Example Request
  ![image](https://github.com/user-attachments/assets/de081d0d-124b-4548-8134-1289a1ed44a7)
