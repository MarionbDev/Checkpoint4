import { object, string, mixed } from "yup";

const drawingCreationSchema = object({
  title: string("Vous devez fournir un titre").required("Un titre est requis"),
  description: string().nullable(),
  image: mixed()
    .required("Une image est requise")
    .test(
      "fileType",
      "L'image doit être au format jpg, jpeg ou png",
      (value) => {
        if (!value) return true;
        const fileExtension = value.name.split(".").pop().toLowerCase();
        return ["jpg", "jpeg", "png"].includes(fileExtension);
      }
    ),
});

export default drawingCreationSchema;
