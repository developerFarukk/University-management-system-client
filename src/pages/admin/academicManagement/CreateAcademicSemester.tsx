/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { semesterOptions } from "../../../constants/semester";
import { zodResolver } from '@hookform/resolvers/zod';
import { monthOptions } from "../../../constants/global";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types/global";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
    value: String(currentYear + number),
    label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {

    const [addAcademicSemester] = useAddAcademicSemesterMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...');

        const name = semesterOptions[Number(data?.name) - 1]?.label;

        const semesterData = {
            name,
            code: data.name,
            year: data.year,
            startMonth: data.startMonth,
            endMonth: data.endMonth,
        };

        console.log(semesterData);
        

        try {
            const res = (await addAcademicSemester(semesterData)) as TResponse;
            console.log(res);
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success('Semester created', { id: toastId });
            }
        } catch (err) {
            toast.error('Something went wrong', { id: toastId });
        }
    };

    return (
        <div>
            <Flex justify="center" align="center">
                <Col span={6}>
                    <PHForm
                        onSubmit={onSubmit}
                        resolver={zodResolver(academicSemesterSchema)}
                    >
                        <PHSelect label="Name" name="name" options={semesterOptions} />
                        <PHSelect label="Year" name="year" options={yearOptions} />
                        <PHSelect
                            label="Start Month"
                            name="startMonth"
                            options={monthOptions}
                        />
                        <PHSelect label="End Month" name="endMonth" options={monthOptions} />

                        <Button htmlType="submit">Submit</Button>
                    </PHForm>
                </Col>
            </Flex>
        </div>
    );
};

export default CreateAcademicSemester;