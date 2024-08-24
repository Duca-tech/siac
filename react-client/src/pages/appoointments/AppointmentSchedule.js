import React, { useState } from "react";
import { Col, ConfigProvider, DatePicker, Row } from "antd";
import "antd/dist/reset.css"; // ou 'antd/dist/antd.css' dependendo da sua configuração
import ptBR from "antd/lib/locale/pt_BR"; // Importa o locale em português

const AppointmentSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTime, setShowTime] = useState(false);

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

  // Define os minutos que não estarão disponíveis (não múltiplos de 15)
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
          <Col>
            <DatePicker
              onChange={handleDateChange}
              format="DD/MM/YYYY"
              style={{ width: "290px" }}
              size="large"
              placeholder="Selecione o dia"
            />
          </Col>
          {selectedDate && showTime && (
            <Col>
              <DatePicker
                picker="time"
                onChange={handleTimeChange}
                showTime={{
                  hideDisabledOptions: true,
                  disabledHours,
                  disabledMinutes,
                }}
                format="HH:mm"
                style={{ width: "180px" }}
                size="large"
                placeholder="Selecione a hora"
              />
            </Col>
          )}
        </Row>
      </div>
    </ConfigProvider>
  );
};

export default AppointmentSchedule;
