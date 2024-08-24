import React, { useState } from "react";
import { Col, ConfigProvider, DatePicker, Row, Select } from "antd";
import "antd/dist/reset.css"; // ou 'antd/dist/antd.css' dependendo da sua configuração
import ptBR from "antd/lib/locale/pt_BR"; // Importa o locale em português

const AppointmentSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTime, setShowTime] = useState(false);

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

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date);
    setShowTime(true);
  };

  const handleTimeChange = (date, dateString) => {
    console.log("Data e hora selecionadas:", date, dateString);
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
    <ConfigProvider locale={ptBR}>
      <div>
        <Row gutter={16}>
          <Col span={6}>
            <DatePicker
              onChange={handleDateChange}
              format="DD/MM/YYYY"
              style={{ width: "100%" }}
              size="large"
              placeholder="Selecione o dia"
            />
          </Col>
          {selectedDate && showTime && (
            <Col span={3}>
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
              />
            </Col>
          )}
          <Col span={6}>
            <Select
              style={{ width: "100%" }}
              size="large"
              placeholder="Selecione o profissional"
              options={mockedDoctors}
            />
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
};

export default AppointmentSchedule;
