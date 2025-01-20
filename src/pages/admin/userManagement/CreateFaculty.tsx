import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";


// Default Valuse
const facultyDefaultValues = {
    name: {
        firstName: 'I am ',
        middleName: 'Student',
        lastName: 'Number 1',
    },
    gender: 'male',

    designation: 'D profesor ',

    bloodGroup: 'A+',

    contactNo: '01917540405',
    emergencyContactNo: '987-654-3210',
    presentAddress: '123 Main St, Cityville',
    permanentAddress: '456 Oak St, Townsville',

    academicFaculty: '674f57292ce90c7594eb9686',
    academicDepartment: '674f6c5061a274857ea16394',
};


const CreateFaculty = () => {

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        console.log(data);

        // const { data: dData, isLoading: dIsLoading } = useGetAcademicDepartmentsQuery(undefined);

        // const departmentOptions = dData?.data?.result?.map((item) => ({
        //     value: item._id,
        //     label: item.name,
        // }));


        // const toastId = toast.loading('Creating...');

        // const studentData = {
        //     password: import.meta.env.PASSWORD,
        //     student: data,
        // };

        // console.log(studentData);


        // const formData = new FormData();
        // console.log(formData);


        // formData.append('data', JSON.stringify(studentData));
        // formData.append('file', data.image);

        // addStudent(formData);

        //! This is for development
        //! Just for checking
        // console.log(Object.fromEntries(formData));


        // try {
        //     const res = (await addStudent(formData)) as TResponse;
        //     console.log(res);
        //     if (res.error) {
        //         // console.log(res.error?.data?.message);

        //         toast.error(res.error?.data?.message, { id: toastId });
        //     } else {
        //         toast.success('User Created Successfully', { id: toastId });
        //     }
        // } catch (err) {
        //     toast.error('Something went wrong', { id: toastId });
        // }

    };

    return (
        <div>
            <Row justify="center">
                <Col span={24}>
                    <PHForm onSubmit={onSubmit} defaultValues={facultyDefaultValues}>
                        <Divider>Personal Info.</Divider>
                        <Row gutter={8}>

                            {/* Name */}
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput type="text" name="name.firstName" label="First Name" />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput type="text" name="name.middleName" label="Middle Name" />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput type="text" name="name.lastName" label="Last Name" />
                            </Col>

                            {/* Gender */}
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHSelect options={genderOptions} name="gender" label="Gender" />
                            </Col>

                            {/* Date of Birth */}
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHDatePicker name="dateOfBirth" label="Date of birth" />
                            </Col>

                            {/* Designation */}
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput type="text" name="designation" label="Designation" />
                            </Col>

                            {/* Blood Group */}
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHSelect
                                    options={bloodGroupOptions}
                                    name="bloodGroup"
                                    label="Blood group"
                                />
                            </Col>

                            {/* Image */}
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

                            {/* Email */}
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput type="text" name="email" label="Email" />
                            </Col>

                            {/* Contuct Number */}
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput type="text" name="contactNo" label="Contact" />
                            </Col>

                            {/* Emargency Contact Number */}
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="emergencyContactNo"
                                    label="Emergency Contact"
                                />
                            </Col>

                            {/* Present Address */}
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="presentAddress"
                                    label="Present Address"
                                />
                            </Col>

                            {/* Prmanents Address */}
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="permanentAddress"
                                    label="Permanent Address"
                                />
                            </Col>
                        </Row>

                        <Divider>Academic Info.</Divider>
                        {/* <Row gutter={8}>
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
                                    options={facultyOptions}
                                    disabled={dIsLoading}
                                    name="academicFaculty"
                                    label="Academic Faculty"
                                />
                            </Col>
                        </Row> */}

                        <Button htmlType="submit">Submit</Button>
                    </PHForm>
                </Col>
            </Row>
        </div>
    );
};

export default CreateFaculty;