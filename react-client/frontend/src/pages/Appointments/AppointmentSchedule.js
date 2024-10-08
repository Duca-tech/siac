import React, { useState } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Row,
  Select,
  Typography,
} from "antd";
import dayjs from "dayjs";
import "antd/dist/reset.css";
import ptBR from "antd/lib/locale/pt_BR";

const AppointmentSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const mockedDoctors = [
    {
      value: "1",
      label: "Henrique",
    },
    {
      value: "2",
      label: "Felipão",
    },
    {
      value: "3",
      label: "Raul",
    },
    {
      value: "4",
      label: "Edu",
    },
  ];

  const handleDateChange = (value, dateString) => {
    setSelectedDate(value);
  };

  const handleTimeChange = (value, dateString) => {
    setSelectedTime(value);
    console.log("Data e hora selecionadas:", value, dateString);
  };

  const handleProfessionalChange = (value) => {
    console.log(value);
  };

  const handleSubmit = (values) => {
    const formattedValues = {
      ...values,
      date: values.date ? dayjs(values.date).format("DD/MM/YYYY") : null,
      time: values.time ? dayjs(values.time).format("HH:mm") : null,
    };

    console.log("Formatted values:", formattedValues);
  };

  const disabledHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      if (i < 7 || i >= 19) {
        hours.push(i);
      }
    }
    return hours;
  };

  const disabledMinutes = (selectedHour) => {
    const minutes = [];
    for (let i = 0; i < 60; i++) {
      if (i % 15 !== 0) {
        minutes.push(i);
      }
    }
    return minutes;
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  return (
    <>
      <Typography.Title level={2} style={{ marginBottom: "40px" }}>
        Agendamento de Consulta
      </Typography.Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <ConfigProvider locale={ptBR}>
          <div>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label="Data"
                  name="date"
                  rules={[{ required: true, message: "Selecione uma data" }]}
                >
                  <DatePicker
                    onChange={handleDateChange}
                    format="DD/MM/YYYY"
                    style={{ width: "100%" }}
                    size="large"
                    placeholder="Selecione o dia"
                    disabledDate={disabledDate}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Horário"
                  name="time"
                  rules={[{ required: true, message: "Selecione um horário" }]}
                >
                  <DatePicker
                    picker="time"
                    onChange={handleTimeChange}
                    showTime={{
                      hideDisabledOptions: true,
                      disabledHours,
                      disabledMinutes,
                    }}
                    format="HH:mm"
                    style={{ width: "100%" }}
                    size="large"
                    placeholder="Selecione a hora"
                    disabled={!selectedDate}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Profissional"
                  name="professional"
                  rules={[
                    { required: true, message: "Selecione um profissional" },
                  ]}
                >
                  <Select
                    style={{ width: "100%" }}
                    onChange={handleProfessionalChange}
                    size="large"
                    placeholder="Selecione o profissional"
                    options={mockedDoctors}
                    disabled={!selectedTime}
                  />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Button
                  size="large"
                  htmlType="submit"
                  type="primary"
                  style={{ marginTop: "30px" }}
                >
                  Agendar consulta
                </Button>
              </Col>
            </Row>
          </div>
        </ConfigProvider>
      </Form>
    </>
  );
};

export default AppointmentSchedule;
