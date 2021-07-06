import React, { forwardRef } from 'react';
import { Form, Input, Upload } from "antd";
import {InboxOutlined} from "@ant-design/icons";

function PostForm(props, formRef) {

    console.log("formRef -> ", formRef);
    const formItemLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 14,
        },
    };

    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    return (

        <Form
            name="validate_other"
            ref={formRef}
            {...formItemLayout}
        >
            <Form.Item
                {...formItemLayout}
                name="description"
                label="Message"
                rules={[
                    {
                        required: true,
                        message: 'Please input your message',
                    },
                ]}
            >
                <Input placeholder="Please input your message" />
            </Form.Item>
            <Form.Item label="Dragger">
                <Form.Item
                    name="dragger"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    noStyle
                    rules={[
                        {
                            required: true,
                            message: 'Please select an image or video',
                        },
                    ]}
                >
                    <Upload.Dragger
                        name="files"
                        beforeUpload={() => false}
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>
        </Form>
    );
}

const ReferencedPostForm = forwardRef(PostForm);

export default ReferencedPostForm;