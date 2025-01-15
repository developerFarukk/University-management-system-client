import { Button } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";



const CreateAcademicSemester = () => {

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        console.log(data);
        

        // const toastId = toast.loading('Creating...');
    
        // const name = semesterOptions[Number(data?.name) - 1]?.label;
    
        // const semesterData = {
        //   name,
        //   code: data.name,
        //   year: data.year,
        //   startMonth: data.startMonth,
        //   endMonth: data.endMonth,
        // };

    }

    return (
        <div>
            <PHForm onSubmit={onSubmit}>
                {/* <PHSelect label="Name" name="name" options={semesterOptions} /> */}
                <PHInput type="text" label="Name" name="name" />
                <Button htmlType="submit">Submit</Button>

            </PHForm>
        </div>
    );
};

export default CreateAcademicSemester;