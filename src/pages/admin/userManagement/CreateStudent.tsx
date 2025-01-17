import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { Controller } from "react-hook-form";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";



const CreateStudent = () => {

    const [addStudent, { data, error }] = useAddStudentMutation();

    console.log({ data, error });

    const { data: sData, isLoading: sIsLoading } =
        useGetAllSemestersQuery(undefined);

    const { data: dData, isLoading: dIsLoading } =
        useGetAcademicDepartmentsQuery(undefined);

    const semesterOptions = sData?.data?.map((item) => ({
        value: item._id,
        label: `${item.name} ${item.year}`,
    }));

    const departmentOptions = dData?.data?.map((item) => ({
        value: item._id,
        label: item.name,
    }));

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const studentData = {
            password: 'student123',
            student: data,
        };

        const formData = new FormData();

        formData.append('data', JSON.stringify(studentData));
        formData.append('file', data.image);

        addStudent(formData);

        //! This is for development
        //! Just for checking
        console.log(Object.fromEntries(formData));
    };

    return (
        <div>
            <Row justify="center">
                <Col span={24}>
                    <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
                        <Divider>Personal Info.</Divider>
                        <Row gutter={8}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput type="text" name="name.firstName" label="First Name" />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput type="text" name="name.middleName" label="Middle Name" />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput type="text" name="name.lastName" label="Last Name" />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHSelect options={genderOptions} name="gender" label="Gender" />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHDatePicker name="dateOfBirth" label="Date of birth" />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHSelect
                                    options={bloodGroupOptions}
                                    name="bloogGroup"
                                    label="Blood group"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <Controller
                                    name="image"
                                    render={({ field: { onChange, value, ...field } }) => (
                                        <Form.Item label="Picture">
                                            <Input
                                                type="file"
                                                value={value?.fileName}
                                                {...field}
                                                onChange={(e) => onChange(e.target.files?.[0])}
                                            />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                        </Row>
                        <Divider>Contact Info.</Divider>
                        <Row gutter={8}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput type="text" name="email" label="Email" />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput type="text" name="contactNo" label="Contact" />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="emergencyContactNo"
                                    label="Emergency Contact"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="presentAddress"
                                    label="Present Address"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="permanentAddress"
                                    label="Permanent Address"
                                />
                            </Col>
                        </Row>
                        <Divider>Guardian</Divider>
                        <Row gutter={8}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="guardian.fatherName"
                                    label="Father Name"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="guardian.fatherOccupation"
                                    label="Father Occupation"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="guardian.fatherContactNo"
                                    label="Father ContactNo"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="guardian.motherName"
                                    label="Mother Name"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="guardian.motherOccupation"
                                    label="Mother Occupation"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="guardian.motherContactNo"
                                    label="Mother ContactNo"
                                />
                            </Col>
                        </Row>
                        <Divider>Local Guardian</Divider>
                        <Row gutter={8}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput type="text" name="localGuardian.name" label="Name" />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="localGuardian.occupation"
                                    label="Occupation"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="localGuardian.contactNo"
                                    label="Contact No."
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="localGuardian.address"
                                    label="Address"
                                />
                            </Col>
                        </Row>
                        <Divider>Academic Info.</Divider>
                        <Row gutter={8}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHSelect
                                    options={semesterOptions}
                                    disabled={sIsLoading}
                                    name="admissionSemester"
                                    label="Admission Semester"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHSelect
                                    options={departmentOptions}
                                    disabled={dIsLoading}
                                    name="academicDepartment"
                                    label="Admission Department"
                                />
                            </Col>
                        </Row>

                        <Button htmlType="submit">Submit</Button>
                    </PHForm>
                </Col>
            </Row>
        </div>
    );
};

export default CreateStudent;