import { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import { FieldValues } from "react-hook-form";

import Form from "components/common/Form";

const CreateProperty = () => {
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true,
    });
    const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
    } = useForm();

    const handleImageChange = (file: File) => {
        console.log(file)
        const reader = (readFile: File) =>

            new Promise<string>((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.onload = () => resolve(fileReader.result as string);
                fileReader.readAsDataURL(readFile);
            });

        reader(file).then((result: string) =>
            setPropertyImage({ name: file?.name, url: result }),
        );
    }
    const handlemultiImageChange = (files: FileList | null) => {
        if (!files) {
          return;
        }
      
        const readerPromises: Promise<{ name: string; url: string }>[] = [];
      
        // Loop through each selected file
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
      
          // Use a function to read the file asynchronously
          const readerPromise = new Promise<{ name: string; url: string }>(
            (resolve, reject) => {
              const fileReader = new FileReader();
      
              fileReader.onload = () => {
                // Resolve with an object containing file name and base64 data URL
                resolve({ name: file.name, url: fileReader.result as string });
              };
      
              fileReader.readAsDataURL(file);
            }
          );
      
          // Add the promise to the array
          readerPromises.push(readerPromise);
        }
      
        // Use Promise.all to wait for all promises to resolve
        Promise.all(readerPromises).then((results) => {
          // Update the state or perform other actions with the array of results
          console.log(results);
          // If you want to update the state with an array of images, you can do something like:
          // setPropertyImages(results);
        });
      };

    const onFinishHandler = async (data: FieldValues) => {
        console.log(data)
        if (!propertyImage.name) return alert("Please select an image");

        await onFinish({
            ...data,
            photo: propertyImage.url,
            email: user.email,
        });
    };

    return (
        <Form
            type="Create"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            handleImageChange={handleImageChange}
            onFinishHandler={onFinishHandler}
            handlemultiImageChange={handlemultiImageChange}
            propertyImage={propertyImage}
        />
    );
};
export default CreateProperty;
