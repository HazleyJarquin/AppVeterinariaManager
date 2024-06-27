export interface IUsersResponse {
  UsuarioID: number;
  NombreUsuario: string;
  Nombre: string;
  SNombre: string;
  Apellido: string;
  SApellido: string;
  Correo: string;
  Rol: Rol;
  created_at: string;
  updated_at: string;
}

interface Rol {
  RoleID: number;
  RoleName: string;
  Description: string;
  CreatedAt: string;
  UpdatedAt: string;
}
// Apellido
// :
// "Salazar"
// Correo
// :
// "Yatzari@veterinaria.com"
// Nombre
// :
// "Yatzari"
// NombreUsuario
// :
// "Yat01"
// Rol
// :
// CreatedAt
// :
// "2024-06-22T22:17:57.407"
// Description
// :
// "Encargado de pagos y sistema"
// RoleID
// :
// 2
// RoleName
// :
// "Administrador"
// UpdatedAt
// :
// "2024-06-22T22:17:57.407"
// [[Prototype]]
// :
// Object
// SApellido
// :
// "Villega"
// SNombre
// :
// "Andrea"
// UsuarioID
// :
// 2
