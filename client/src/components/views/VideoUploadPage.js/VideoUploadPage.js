import React from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Title from 'antd/lib/typography/Title';
import TextArea from 'antd/lib/input/TextArea';
import Dropzone from 'react-dropzone'
import { useState } from 'react';
import { Select } from 'antd';
const { Option } = Select;

const PrivateOptions = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" }
]

const CateogryOptions = [
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Autos & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pets & Animals" }
]

function VideoUploadPage() {

    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState("Film & Animation");


    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    }

    const onPrivateChange = (e) => {
        setPrivate(e);
    }

    const onCategoryChange = (e) => {
        setCategory(e);
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>업로드 비디오</Title>
            </div>

            <Form >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Drop zone  */}


                    <Dropzone multiple >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{
                                width: "100%", height: 240, border: '1px solid lightgray',
                                alignItems: 'center', justifyContent: 'center', display: 'flex'
                            }} {...getRootProps()}>


                                <input {...getInputProps()} />

                                <Icon type="plus" style={{ fontSize: '3rem' }} />


                            </div>
                        )}
                    </Dropzone>

                    {/*Thumbnail */}
                </div>

                <div style={{ display: "none" }}>
                    <img alt="" />
                </div>



                <br /><br /><br />
                <label>제목</label>
                <Input onChange={onTitleChange}
                    value={VideoTitle}
                />


                <br /><br /><br />
                <label>내용</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />

                <br /><br /><br />

                <Select onChange={onPrivateChange} style={{ width: '20%' }}>
                    {PrivateOptions.map((item, index) => (
                        <Option key={index} value={item.value}>{item.label}</Option>
                    ))}
                </Select>

                <br /><br /><br />

                <Select onChange={onCategoryChange} style={{ width: '20%' }}>
                    {CateogryOptions.map((item, index) => (
                        <Option key={index} value={item.value}>{item.label}</Option>
                    ))}
                </Select>

                <br /><br /><br />
                <Button size='large' type='primary'>
                    전송
                </Button>



            </Form>



        </div >

    )
};


export default VideoUploadPage;