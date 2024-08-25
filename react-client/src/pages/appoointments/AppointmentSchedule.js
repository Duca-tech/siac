import React, { useState } from "react";
import { Col, ConfigProvider, DatePicker, Form, Row, Select } from "antd";
import "antd/dist/reset.css"; // ou 'antd/dist/antd.css' dependendo da sua configuração
import ptBR from "antd/lib/locale/pt_BR"; // Importa o locale em português

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

  const handleChange = (value) => {
    console.log(value);
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

  return (
    <Form layout="vertical">
      <ConfigProvider locale={ptBR}>
        <div>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Selecione a data">
                <DatePicker
                  onChange={handleDateChange}
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                  size="large"
                  placeholder="Selecione o dia"
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="Selecione o horário">
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
              <Form.Item label="Selecione o profissional">
                <Select
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  size="large"
                  placeholder="Selecione o profissional"
                  options={mockedDoctors}
                  disabled={!selectedTime}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </ConfigProvider>
    </Form>
  );
};

export default AppointmentSchedule;
