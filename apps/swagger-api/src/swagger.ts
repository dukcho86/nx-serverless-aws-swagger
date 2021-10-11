import { SwaggerUIBundle } from 'swagger-ui-dist';

export const initSwagger = (): void => {
  SwaggerUIBundle({
    url: 'https://petstore.swagger.io/v2/swagger.json',
    dom_id: '#swagger',
    deepLinking: true,
  });
};
