import React, { useState } from 'react';
import { Modal, Button, Form, Input, Rate, message } from 'antd';
import { CreateFeedBackService } from '../../../api/OrderApi';
import './Feedback.css';

const Feedback = ({ orderId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState('');
  const [feedbackStars, setFeedbackStars] = useState(0);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      await CreateFeedBackService({
        id: orderId,
        feedbackContent,
        feedbackStars,
      });
      message.success('Feedback submitted successfully!');
      setIsModalVisible(false);
      setFeedbackContent('');
      setFeedbackStars(0);
    } catch (error) {
      message.error('Error submitting feedback.');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="feedback-container">
      <Button className="feedback-button" type="primary" onClick={showModal}>
        Give Feedback
      </Button>
      <Modal
        title={<div className="feedback-modal-title">Feedback Form</div>}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item className="feedback-form-item" label="Feedback Content" required>
            <Input.TextArea
              value={feedbackContent}
              onChange={(e) => setFeedbackContent(e.target.value)}
              rows={4}
              required
            />
          </Form.Item>
          <Form.Item className="feedback-form-item" label="Feedback Stars" required>
            <Rate
              value={feedbackStars}
              onChange={(value) => setFeedbackStars(value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Feedback;