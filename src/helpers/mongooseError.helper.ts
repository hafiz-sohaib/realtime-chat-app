export const handleMongooseValidation = (error: Error | any, modelName: string) => {
    if (error.message.includes(`${modelName} validation failed`)) {
        const errors: any = {};
        Object.values(error?.errors).map(({properties}: any) => errors[properties?.path] = properties?.message);
        return errors;
    }

    if (error.code === 11000) {
        const errors: any = {};
        Object.keys(error?.keyValue).map((elem): any => errors[elem] = `This ${elem} already exists`);
        return errors;
    }

    return { error: "SignUp failed \n"+error };
}