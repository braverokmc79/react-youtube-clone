import React from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Title from 'antd/lib/typography/Title';
import TextArea from 'antd/lib/input/TextArea';
import Dropzone from 'react-dropzone'

function VideoUploadPage() {
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

                <div>
                    <img src alt />
                </div>



                <br /><br /><br />
                <label>제목</label>
                <Input />

                <br /><br /><br />
                <label>내용</label>
                <TextArea />

                <br /><br /><br />

                <select onChange>
                    <option key="1" value>1</option>
                </select>

                <br /><br /><br />
                <select onChange>
                    <option key="1" value>1</option>
                </select>

                <br /><br /><br />
                <Button size='large' onClick type='primary'>
                    전송
                </Button>



            </Form>



        </div >

    )
};


export default VideoUploadPage;