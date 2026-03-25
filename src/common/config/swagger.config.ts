import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('MiniStore API')
  .setDescription('Sistema de gestión de micro-tienda con roles y SQLite')
  .setVersion('1.0')
  .addTag('Auth', 'Operaciones de inicio de sesión y tokens')
  .addTag('Users', 'Gestión de usuarios y perfiles')
  .addTag('Products', 'Catálogo de productos e inventario')
  .addTag('Orders', 'Procesamiento de ventas y facturación')
  .addBearerAuth()
  .build();
