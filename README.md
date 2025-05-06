# Reto Técnico Back End

## Challenge
Link: [Enlace al desafío](https://example.com)

## Descripción
Este proyecto es un reto técnico para implementar un sistema de gestión de citas utilizando AWS (DynamoDB, SQS, SNS, EventBridge) y Node.js.

## Requisitos
- Node.js v20.x
- AWS CLI
- Serverless Framework

## Configuración
1. Configurar el aws profile que usarás con serverless: [Docs](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html)
2. Clonar el repositorio: `git clone https://github.com/dimacros/rimac-challenge`
3. Instalar las dependencias: `npm install`
4. Configurar las variables de entorno: `cp .env.example .env`
5. Migrar las base de datos:
  ```bash
  npm run db:migrate:cl && npm run db:migrate:pe

  npm run db:seed
  ```

6. Desplegar serverless: `npx serverless --aws-profile {your_account} deploy`

7. Revisar datos disponibles:
  ```bash
  curl --location 'https://we4un82hsb.execute-api.us-east-1.amazonaws.com' \
    --header 'Content-Type: application/json'
  ```
  Ejemplo de la respuesta:
  ```json
    {
      "cl": {
        "doctorSchedules": [
          {
            "scheduleId": 7,
            "centerId": 2,
            "specialtyId": 3,
            "doctorId": 2,
            "startTime": "2025-06-11",
            "endTime": "2025-06-11",
            "createdAt": "2025-05-05T20:47:37.239Z",
            "updatedAt": "2025-05-05T20:47:37.106Z"
          },
          {
            "scheduleId": 8,
            "centerId": 2,
            "specialtyId": 4,
            "doctorId": 2,
            "startTime": "2025-06-11",
            "endTime": "2025-06-11",
            "createdAt": "2025-05-05T20:47:37.239Z",
            "updatedAt": "2025-05-05T20:47:37.106Z"
          }
        ]
      },
      "pe": {
        "doctorSchedules": [
          {
            "scheduleId": 1,
            "centerId": 1,
            "specialtyId": 1,
            "doctorId": 1,
            "startTime": "2025-06-10",
            "endTime": "2025-06-10",
            "createdAt": "2025-05-05T20:47:37.240Z",
            "updatedAt": "2025-05-05T20:47:37.107Z"
          },
          {
            "scheduleId": 2,
            "centerId": 1,
            "specialtyId": 2,
            "doctorId": 1,
            "startTime": "2025-06-10",
            "endTime": "2025-06-10",
            "createdAt": "2025-05-05T20:47:37.240Z",
            "updatedAt": "2025-05-05T20:47:37.107Z"
          }
        ]
      },
    }
  ```
8. Crear un appointment usando los ids de los datos disponibles:

  ```bash
  curl --location 'https://we4un82hsb.execute-api.us-east-1.amazonaws.com/appointments' \
    --header 'Content-Type: application/json' \
    --data '{
      "insuredId": "00001",
      "scheduleId": 2,
      "countryISO": "PE"
    }'
  ```

9. Obtener appointments:
  ```bash
  curl --location 'https://we4un82hsb.execute-api.us-east-1.amazonaws.com/appointments?insuredId=00001' \
    --header 'Content-Type: application/json'
  ```