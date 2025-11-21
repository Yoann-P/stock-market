"use client"

import React from 'react'
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import {INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS} from "@/lib/constant";
import {CountrySelectField}from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isSubmitting},
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            country: "FR",
            investmentGoals: "Growth",
            riskTolerance: "Medium",
            preferredIndustry: "Technology"
        },
        mode: "onBlur"
    })
    const onSubmit = async (data: SignUpFormData) => {
        try {
            console.log(data)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <h1 className={"form-title"}>Sign-up & Personalize</h1>

            <form onSubmit={handleSubmit(onSubmit)} className={"space-y-5"}>
                {/*FullName*/}
                <InputField
                    name={"fullName"}
                    label={"Full Name"}
                    placeholder={"John Doe"}
                    register={register}
                    error={errors.fullName}
                    validation={{required:"Full name is required",minLength:3}}
                />

                {/*Email*/}
                <InputField
                    name={"email"}
                    label={"Email"}
                    placeholder={"johndoe@contact.com"}
                    register={register}
                    error={errors.email}
                    validation={{required:"Email is required",pattern: /^\w+@\w+\.\w+$/,minLength:5}}
                />

                {/*Password*/}
                <InputField
                    name={"password"}
                    label={"Password"}
                    type={"password"}
                    placeholder={"Enter a Strong Password"}
                    register={register}
                    error={errors.password}
                    validation={{required:"Password is required",minLength:8}}
                />

                {/*Country*/}
                <CountrySelectField
                    name={"country"}
                    label={"Country"}
                    control={control}
                    error={errors.country}
                    required
                />

                {/*Investments Goals*/}
                <SelectField
                    name={"investmentGoals"}
                    label={"Investment Goals"}
                    placeholder={"Select an Investment Goal"}
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                    required
                />

                {/*Risk Tolerance*/}
                <SelectField
                    name={"riskTolerance"}
                    label={"Risk Tolerance"}
                    placeholder={"Select a Risk Level"}
                    options={RISK_TOLERANCE_OPTIONS}
                    control={control}
                    error={errors.riskTolerance}
                    required
                />

                {/*Preferred industries*/}
                <SelectField
                    name={"preferredIndustry"}
                    label={"Preferred Industry"}
                    placeholder={"Select a Preferred Industry"}
                    options={ PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                    required
                />

                <Button
                    type={"submit"}
                    disabled={isSubmitting}
                    className={"yellow-btn w-full mt-5"}
                >
                    {isSubmitting ? "Creating Account" : "Start Your Investing Journey"}
                </Button>
            </form>

            <FooterLink
                text="Already have an account?"
                linkText="Sign In"
                href="/sign-in"

            />
        </>
    )
}
export default SignUp
