// import type { Intent } from '@conform-to/react';
// import { conformZodMessage } from '@conform-to/zod';
import { z } from 'zod';

export const PromptSchema = z.object({
    prompt: z.string().min(1, { message: 'Prompt is required' })
    .pipe(z.string().superRefine((value, ctx) => {
        if (value.length > 300) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Prompt is too long',
            });
        }
        if(value.length < 3){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Prompt is too short',
            });
        }
    })),
});

export type Schema = typeof PromptSchema;