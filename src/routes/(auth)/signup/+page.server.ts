import type { Actions } from "./$types";
import type { Region, Gender } from "@prisma/client";

import { fail } from "@sveltejs/kit";

import prisma from "$lib/prisma";

import argon2 from "argon2";

export const actions = {
    default: async ({ request }) =>  {
        const data = await request.formData();

        const email = data.get("email");
        const password = data.get("password");
        const confirmPassword = data.get("confirmPassword");
        const region = data.get("region");
        const fullName = data.get("fullName");


        const userExists = await prisma.user.count({
            where: {
                email: email as string
            }
        });

        if (userExists > 0) {
            return fail(409, { email, region, error: "EMAIL" });
        }


        if (password !== confirmPassword) { 
            return fail(400, { email, region, error: "PASS_MISMATCH" });
        }


        const hash = await argon2.hash(password as string);

        const user = await prisma.user.create({
            data: {
                email: email as string,
                passHash: hash,
                name: fullName as string,
                region: region as Region,
                gender: "MALE"
            }
        });

        return { success: true, message: "success" }
    }
} satisfies Actions
