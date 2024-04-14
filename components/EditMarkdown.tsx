'use client';

import { Button, Modal } from 'antd';
import { useState, useRef } from 'react';
import type { ForwardedRef } from 'react';
import dynamic from 'next/dynamic';

const MarkdownEditor = dynamic(() => import('./MarkdownEditor'), {
  ssr: false,
});

import { Avatar, Dropdown, Menu, Typography, Space } from 'antd';

interface AdminAvatarProps {
  content: string;
  id: string;
  action: any;
}

const AdminAvatar = ({ content, id, action }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [markdown, setMarkdown] = useState(content);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    await action(markdown, id);

    setIsModalVisible(false);

    window.location.reload();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEditorChange = (text) => {
    setMarkdown(text);
  };

  return (
    <>
      <Button
        className="section-header-button"
        type="default"
        size="small"
        onClick={showModal}
      >
        Edit
      </Button>
      <Modal
        title="Edit"
        width="80%"
        height="50vw"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <MarkdownEditor
          markdown={markdown}
          onChange={handleEditorChange}
          style={{ height: '60vh' }}
        />
      </Modal>
    </>
  );
};

export default AdminAvatar;
