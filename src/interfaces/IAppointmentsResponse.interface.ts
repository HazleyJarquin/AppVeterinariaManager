export interface IAppointmentsResponse {
  CitasID: number | null;
  FechaHora: string;
  Motivo: string;
  Mascota: Mascota;
  Cliente: Cliente;
  Veterinario: Veterinario;
  Activa: number;
}

export interface Mascota {
  MascotaID: number;
  Nombre: string;
  Especie: string;
  Raza: string;
  FechaNacimiento: string;
}

export interface Cliente {
  NombreDueño: string;
  TelDueño: string;
}

export interface Veterinario {
  NombreVeterinario: string;
}
