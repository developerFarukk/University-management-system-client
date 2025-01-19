import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";


const OfferCourse = () => {

    const [id, setId] = useState('');

    console.log('Inside parent component', id);

    const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

    const academicSemesterOptions = academicFacultyData?.data?.result?.map((item) => ({
        value: item._id,
        label: item.name,
    }));

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };

    return (
        <div>
            <Flex justify="center" align="center">
                <Col span={6}>
                    <PHForm onSubmit={onSubmit}>
                        <PHSelectWithWatch
                            onValueChange={setId}
                            label="Academic Semester"
                            name="academicSemester"
                            options={academicSemesterOptions}
                        />
                        <PHInput disabled={!id} type="text" name="test" label="Test" />
                        <Button htmlType="submit">Submit</Button>
                    </PHForm>
                </Col>
            </Flex>
        </div>
    );
};

export default OfferCourse;