/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { useGetAcademicDepartmentsQuery, useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { toast } from "sonner";
import { TResponse } from "../../../types";

// const studentDummyData = {
//     password: '123456',
//     student: {
//         name: {
//             firstName: 'I am ',
//             middleName: 'Student',
//             lastName: 'Number 1',
//         },
//         gender: 'male',
//         dateOfBirth: '1990-01-01',
//         bloogGroup: 'A+',

//         email: 'student3@gmail.com',
//         contactNo: '1235678',
//         emergencyContactNo: '987-654-3210',
//         presentAddress: '123 Main St, Cityville',
//         permanentAddress: '456 Oak St, Townsville',

//         guardian: {
//             fatherName: 'James Doe',
//             fatherOccupation: 'Engineer',
//             fatherContactNo: '111-222-3333',
//             motherName: 'Mary Doe',
//             motherOccupation: 'Teacher',
//             motherContactNo: '444-555-6666',
//         },

//         localGuardian: {
//             name: 'Alice Johnson',
//             occupation: 'Doctor',
//             contactNo: '777-888-9999',
//             address: '789 Pine St, Villageton',
//         },

//         admissionSemester: '65bb60ebf71fdd1add63b1c0',
//         academicDepartment: '65b4acae3dc8d4f3ad83e416',
//     },
// };

// Default Valus
const studentDefaultValues = {
    name: {
        firstName: 'I am ',
        middleName: 'Student',
        lastName: 'Number 1',
    },
    gender: 'male',

    bloodGroup: 'A+',

    contactNo: '01917540405',
    emergencyContactNo: '987-654-3210',
    presentAddress: '123 Main St, Cityville',
    permanentAddress: '456 Oak St, Townsville',

    guardian: {
        fatherName: 'James Doe',
        fatherOccupation: 'Engineer',
        fatherContactNo: '111-222-3333',
        motherName: 'Mary Doe',
        motherOccupation: 'Teacher',
        motherContactNo: '444-555-6666',
    },

    localGuardian: {
        name: 'Alice Johnson',
        occupation: 'Doctor',
        contactNo: '777-888-9999',
        address: '789 Pine St, Villageton',
    },

    admissionSemester: '674dda19e2a1de8278a52c4c',
    academicFaculty: '674f57292ce90c7594eb9686',
    academicDepartment: '674f6c5061a274857ea16394',
};

const CreateStudent = () => {

    const [addStudent, { data, error }] = useAddStudentMutation();

    console.log({ data, error });

    const { data: sData, isLoading: sIsLoading } = useGetAllSemestersQuery(undefined);
    // console.log(sData?.data);


    const { data: dData, isLoading: dIsLoading } = useGetAcademicDepartmentsQuery(undefined);

    const semesterOptions = sData?.data?.result?.map((item) => ({
        value: item._id,
        label: `${item.name} ${item.year}`,
    }));

    const departmentOptions = dData?.data?.result?.map((item) => ({
        value: item._id,
        label: item.name,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        const toastId = toast.loading('Creating...');

        const studentData = {
            password: '123456',
            student: data,
        };

        // console.log(studentData);


        const formData = new FormData();
        // console.log(formData);


        formData.append('data', JSON.stringify(studentData));
        formData.append('file', data.image);

        addStudent(formData);

        //! This is for development
        //! Just for checking
        console.log(Object.fromEntries(formData));


        try {
            const res = (await addStudent(formData)) as TResponse;
            console.log(res);
            if (res.error) {
                // console.log(res.error?.data?.message);
                
                toast.error(res.error?.data?.message, { id: toastId });
            } else {
                toast.success('User Created Successfully', { id: toastId });
            }
        } catch (err) {
            toast.error('Something went wrong', { id: toastId });
        }

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
                                    name="bloodGroup"
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
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHSelect
                                    options={departmentOptions}
                                    disabled={dIsLoading}
                                    name="academicFaculty"
                                    label="Academic Faculty"
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