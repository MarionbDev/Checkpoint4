import { object, string } from "yup";

export const changePasswordSchema = object({
  newPassword: string("Vous devez renseigner un nouveau mot de passe").required(
    "Un nouveau mot de passe est requis"
  ),
  confirmNewPassword: string("Vous devez confirmer votre nouveau mot de passe"),
});

export const userUpdateSchema = object({
  newPassword: string().required(),
  confirmNewPassword: string().required(),
});
