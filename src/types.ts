import { z } from "zod";

export const createPlanSchema = z.object({
    name: z.string().min(2),
    idade: z.number().positive(),
    peso_kg: z.number().positive(),
    altura_cm: z.number().positive(),
    objetivo: z.enum(["perda de peso", "hipertrofia", "manutencao do peso"]),
    sexo: z.enum(["masculino", "feminino"]),
    nivel_atividade: z.enum(["sedentario", "2x_semanal", "3x_semanal", "4x_semanal", "5x_semanal"]),

})

export type createPlanSchemaType = z.infer<typeof createPlanSchema>;