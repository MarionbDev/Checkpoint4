import { object, string } from "yup";

export const changePasswordSchema = object({
  newPassword: string("Vous devez renseigner un nouveau mot de passe")
    .matches(
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      "Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule et un chiffre."
    )
    .required("Un nouveau mot de passe est requis"),
  confirmNewPassword: string(
    "Vous devez confirmer votre nouveau mot de passe"
  ).matches(
    /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    "Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule et un chiffre."
  ),
});

export const userUpdateSchema = object({
  newPassword: string().required(),
  confirmNewPassword: string().required(),
});
