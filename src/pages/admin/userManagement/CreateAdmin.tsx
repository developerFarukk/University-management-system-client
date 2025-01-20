/* eslint-disable @typescript-eslint/no-unused-vars */
// import { 
//     useGetAllAdminsQuery, 
//     useGetAllStudentsQuery
//  } from "../../../redux/features/admin/userManagement.api";

import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { useAddAdminMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";

// Default value
const adminDefaultValues = {
    name: {
        firstName: 'I am ',
        middleName: 'Student',
        lastName: 'Number 1',
    },
    designation: 'Enterprenoar',
    gender: 'male',

    bloodGroup: 'A+',

    contactNo: '01917540405',
    emergencyContactNo: '987-654-3210',
    presentAddress: '123 Main St, Cityville',
    permanentAddress: '456 Oak St, Townsville',
};

const CreateAdmin = () => {

    const [addAdmin, { data, error }] = useAddAdminMutation();
    console.log({ data, error });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        const toastId = toast.loading('Creating...');

        const adminData = {
            password: import.meta.env.PASSWORD,
            admin: data,
        };

        console.log(adminData);

        const formData = new FormData();
        // console.log(formData);

        formData.append('data', JSON.stringify(adminData));
        formData.append('file', data.image);

        addAdmin(formData);

        // //! Just for checking
        console.log(Object.fromEntries(formData));


        try {
            const res = (await addAdmin(formData)) as TResponse;
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
                    <PHForm onSubmit={onSubmit} defaultValues={adminDefaultValues}>
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

                            {/* Designation */}
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput type="text" name="designation" label="Designation" />
                            </Col>

                            {/*  gender */}
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHSelect options={genderOptions} name="gender" label="Gender" />
                            </Col>

                            {/* Date Of Birth */}
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHDatePicker name="dateOfBirth" label="Date of birth" />
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

                            {/* Contact Number */}
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput type="text" name="contactNo" label="Contact" />
                            </Col>

                            {/* Emargency Contact */}
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

                            {/* Permanents Address */}
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="permanentAddress"
                                    label="Permanent Address"
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

export default CreateAdmin;