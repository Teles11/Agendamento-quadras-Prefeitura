import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../components/Button";
import { jsPDF } from "jspdf";
// --- IMPORTAÇÃO DAS IMAGENS LOCAIS ---
import quadra1 from "../assets/quadras/Centro de Iniciação ao Esporte .jpg";
import quadra2 from "../assets/quadras/Arena 23.jpeg";

// --- ESTILOS ---
const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;
const Sidebar = styled.div`
  width: 250px;
  background: #1a1a2e;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const SidebarTitle = styled.h2`
  margin-bottom: 30px;
  text-align: center;
`;
const SidebarItem = styled.div`
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  cursor: pointer;
  background: ${({ active }) => (active ? "#16213e" : "transparent")};
  transition: 0.2s;
  &:hover {
    background: #0f3460;
  }
`;
const Content = styled.div`
  flex: 1;
  background: #f4f6fa;
  padding: 20px;
  overflow-y: auto;
`;
const DashboardContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;
const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #222;
`;
const QuadraGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;
const QuadraCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  text-align: center;
  transition: transform 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.03);
  }
`;
const QuadraImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;
const QuadraInfo = styled.div`
  padding: 16px;
  h3 {
    margin: 0 0 5px;
    font-weight: bold;
  }
  h4 {
    margin: 0 0 10px;
    font-size: 14px;
    color: #444;
  }
  p {
    font-size: 14px;
    color: #666;
  }
`;
const DetalheContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  max-width: 900px;
  margin: 0 auto;
`;
const DetalheImagem = styled.img`
  width: 100%;
  height: 350px;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 15px;
`;
const DetalheInfo = styled.div`
  margin-bottom: 20px;
  h2 {
    font-weight: bold;
    margin-bottom: 5px;
  }
  h4 {
    margin: 0 0 10px;
    font-size: 16px;
    color: #444;
  }
  p {
    font-size: 16px;
    color: #555;
  }
`;
const HorariosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 15px;
`;
const HorarioButton = styled.button`
  padding: 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: ${({ ocupado }) => (ocupado ? "#ccc" : "#007bff")};
  color: white;
  transition: 0.2s;
  &:hover {
    background: ${({ ocupado }) => (ocupado ? "#ccc" : "#0056b3")};
  }
`;
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
`;

// --- DADOS DAS QUADRAS ---
const Quadras = [
  { id: 1, nome: "CIE - Centro de Iniciação ao Esporte", bairro: "Dom Rufino", descricao: "Quadra poliesportiva oficial, ideal para campeonatos.", imagem: quadra1 },
  { id: 2, nome: "Arena Society", bairro: "Pindorama", descricao: "Gramado sintético de última geração para futebol society.", imagem: quadra2 },
];

// Horários disponíveis
const horariosDisponiveis = [
  "08:00", "09:00", "10:00",
  "14:00", "15:00", "16:00",
  "18:00", "19:00", "20:00"
];

// Componente funcional
const Home = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [selectedQuadra, setSelectedQuadra] = useState(null);
  const [data, setData] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");

  // Estado para dados do usuário e reservas
  const [userData, setUserData] = useState({
    nome: "João Silva",
    email: "joao.silva@email.com",
    endereco: "Av. Principal, 123 - Centro, Cidade - UF",
    reservas: [
      {
        id: 1,
        quadra: Quadras[0],
        data: '2023-11-15',
        horario: '14:00',
        dataReserva: '2023-11-10T14:30:00',
        status: 'Confirmado',
        codigo: 'ABC123',
        documentoEmitido: true
      },
      {
        id: 2,
        quadra: Quadras[1],
        data: '2023-11-16',
        horario: '18:00',
        dataReserva: '2023-11-11T09:15:00',
        status: 'Pendente',
        codigo: 'DEF456',
        documentoEmitido: false
      }
    ]
  });

  const [userPhoto, setUserPhoto] = useState("https://via.placeholder.com/120");

  // Função para carregar imagens
  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  };

  // Função para gerar PDF do alvará
  const gerarAlvaraPDF = async (reserva) => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const marginLeft = 15;
      const pageWidth = doc.internal.pageSize.getWidth();
      const centerX = pageWidth / 2;

      try {
        const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bras%C3%A3o_Parna%C3%ADba.svg/1200px-Bras%C3%A3o_Parna%C3%ADba.svg.png';
        const logoData = await loadImage(logoUrl);
        doc.addImage(logoData, 'PNG', centerX - 15, 15, 30, 30);
      } catch (e) {
        console.error('Erro ao carregar logo:', e);
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('PREFEITURA MUNICIPAL DE PARNAÍBA', centerX, 50, { align: 'center' });
      doc.setFontSize(14);
      doc.text('SECRETARIA MUNICIPAL DE ESPORTES E LAZER', centerX, 57, { align: 'center' });

      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.line(marginLeft, 65, pageWidth - marginLeft, 65);

      doc.setFontSize(18);
      doc.text('ALVARÁ DE AUTORIZAÇÃO', centerX, 75, { align: 'center' });
      doc.setFontSize(12);
      doc.text(`Nº ${reserva.codigo}`, centerX, 81, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      let yPosition = 90;

      doc.text(`A Prefeitura Municipal de Parnaíba, através da Secretaria de Esportes e Lazer,`, marginLeft, yPosition);
      yPosition += 7;
      doc.text(`AUTORIZA`, marginLeft, yPosition);
      yPosition += 7;

      doc.setFont('helvetica', 'bold');
      doc.text(`${userData.nome.toUpperCase()}`, centerX, yPosition, { align: 'center' });
      yPosition += 7;
      doc.setFont('helvetica', 'normal');

      doc.text(`A utilizar a quadra esportiva: ${reserva.quadra.nome}`, marginLeft, yPosition);
      yPosition += 7;
      doc.text(`Localizada no bairro: ${reserva.quadra.bairro}`, marginLeft, yPosition);
      yPosition += 7;

      const dataFormatada = new Date(reserva.data).toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      doc.text(`No dia: ${dataFormatada}`, marginLeft, yPosition);
      yPosition += 7;
      doc.text(`No horário: ${reserva.horario}`, marginLeft, yPosition);
      yPosition += 10;

      doc.text('O presente documento deverá ser apresentado no local da quadra no dia do evento.', marginLeft, yPosition);
      yPosition += 7;
      doc.text('Em caso de cancelamento, favor entrar em contato com 48h de antecedência.', marginLeft, yPosition);
      yPosition += 15;

      doc.text(`Parnaíba, ${new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}`, marginLeft, yPosition);
      yPosition += 20;

      doc.setLineWidth(0.3);
      doc.line(marginLeft, yPosition, marginLeft + 60, yPosition);
      doc.text('Secretário Municipal de Esportes', marginLeft, yPosition + 5);

      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text('Documento gerado automaticamente pelo Sistema de Reservas de Quadras Esportivas', centerX, 287, { align: 'center' });
      doc.text(`Data de emissão: ${new Date().toLocaleString('pt-BR')}`, centerX, 292, { align: 'center' });

      doc.save(`Alvara_Reserva_${userData.nome.replace(/\s+/g, '_')}_${reserva.data}.pdf`);

    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Ocorreu um erro ao gerar o documento. Por favor, tente novamente.');
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUserPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    alert("✅ Dados atualizados com sucesso!");
  };

  const handleConfirmar = () => {
    if (!data || !horarioSelecionado) {
      alert("Escolha a data e o horário antes de confirmar!");
      return;
    }
    
    const novaReserva = {
      id: Date.now(),
      quadra: selectedQuadra,
      data,
      horario: horarioSelecionado,
      dataReserva: new Date().toISOString(),
      status: 'Confirmado',
      codigo: `RES${Math.floor(1000 + Math.random() * 9000)}`,
      documentoEmitido: false
    };

    setUserData(prev => ({
      ...prev,
      reservas: [...prev.reservas, novaReserva]
    }));

    alert(`✅ ${selectedQuadra.nome} agendada em ${data} às ${horarioSelecionado}`);
    setSelectedQuadra(null);
  };

  const horariosOcupados = userData.reservas
    .filter(r => r.quadra.id === selectedQuadra?.id && r.data === data)
    .map(r => r.horario);

  // --- ESTADOS PARA FILTRO DE RESERVAS ---
  const [filtroData, setFiltroData] = useState("");
  const [filtroQuadra, setFiltroQuadra] = useState("");
  const [reservasFiltradas, setReservasFiltradas] = useState(userData.reservas);

  // Atualiza reservas filtradas sempre que filtros ou reservas mudam
  React.useEffect(() => {
    let filtradas = userData.reservas;
    if (filtroData) {
      filtradas = filtradas.filter(r => r.data === filtroData);
    }
    if (filtroQuadra) {
      filtradas = filtradas.filter(r => String(r.quadra.id) === filtroQuadra);
    }
    setReservasFiltradas(filtradas);
  }, [filtroData, filtroQuadra, userData.reservas]);

  // Função para destacar o horário selecionado
  const isHorarioSelecionado = (hora) => horarioSelecionado === hora;

  return (
    <Layout>
      <Sidebar>
        <SidebarTitle>🏀 Quadras</SidebarTitle>
        <SidebarItem active={activeMenu === "dashboard"} onClick={() => { setActiveMenu("dashboard"); setSelectedQuadra(null); }}>
          <span role="img" aria-label="dashboard">🏠</span> Dashboard
        </SidebarItem>
        <SidebarItem active={activeMenu === "conta"} onClick={() => setActiveMenu("conta")}>
          <span role="img" aria-label="conta">👤</span> Minha Conta
        </SidebarItem>
        <SidebarItem active={activeMenu === "reservas"} onClick={() => setActiveMenu("reservas")}>
          <span role="img" aria-label="reservas">📖</span> Minhas Reservas
        </SidebarItem>
        <SidebarItem active={activeMenu === "faq"} onClick={() => setActiveMenu("faq")}>
          <span role="img" aria-label="faq">❓</span> FAQ
        </SidebarItem>
      </Sidebar>

      <Content>
        {/* DASHBOARD */}
        {activeMenu === "dashboard" && !selectedQuadra && (
          <DashboardContainer>
            <Title>📅 Agendamento de Quadras</Title>
            <QuadraGrid>
              {Quadras.map((quadra) => (
                <QuadraCard key={quadra.id} onClick={() => setSelectedQuadra(quadra)}>
                  <QuadraImage src={quadra.imagem} alt={quadra.nome} />
                  <QuadraInfo>
                    <h3>{quadra.nome}</h3>
                    <h4>{quadra.bairro}</h4>
                    <p>{quadra.descricao}</p>
                  </QuadraInfo>
                </QuadraCard>
              ))}
            </QuadraGrid>
          </DashboardContainer>
        )}

        {/* DETALHE DA QUADRA E AGENDAMENTO */}
        {activeMenu === "dashboard" && selectedQuadra && (
          <DetalheContainer>
            <Button onClick={() => setSelectedQuadra(null)}>⬅ Voltar</Button>
            <DetalheImagem src={selectedQuadra.imagem} alt={selectedQuadra.nome} />
            <DetalheInfo>
              <h2>{selectedQuadra.nome}</h2>
              <h4>{selectedQuadra.bairro}</h4>
              <p>{selectedQuadra.descricao}</p>
            </DetalheInfo>
            <label>Selecione a Data:</label>
            <Input 
              type="date" 
              value={data} 
              onChange={(e) => { setData(e.target.value); setHorarioSelecionado(""); }}
              min={new Date().toISOString().split('T')[0]}
            />
            <h3>Selecione o Horário:</h3>
            <HorariosGrid>
              {horariosDisponiveis.map((hora) => (
                <HorarioButton
                  key={hora}
                  ocupado={horariosOcupados.includes(hora)}
                  disabled={horariosOcupados.includes(hora)}
                  style={{
                    border: isHorarioSelecionado(hora) ? "2px solid #007bff" : undefined,
                    fontWeight: isHorarioSelecionado(hora) ? "bold" : undefined,
                    background: isHorarioSelecionado(hora) ? "#0056b3" : (horariosOcupados.includes(hora) ? "#ccc" : "#007bff")
                  }}
                  onClick={() => setHorarioSelecionado(hora)}
                >
                  {hora}
                </HorarioButton>
              ))}
            </HorariosGrid>
            <div style={{ marginTop: "20px" }}>
              <Button $primary onClick={handleConfirmar} disabled={!data || !horarioSelecionado}>
                Confirmar
              </Button>
            </div>
          </DetalheContainer>
        )}

        {/* MINHA CONTA */}
        {activeMenu === "conta" && (
          <div
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              background: "linear-gradient(120deg, #f4f6fa 60%, #e0e7ff 100%)",
              padding: "32px 28px",
              borderRadius: "18px",
              boxShadow: "0 8px 32px rgba(30,40,90,0.10)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <Title>
              <span role="img" aria-label="perfil">👤</span> Minha Conta
            </Title>
            <div style={{ textAlign: "center", marginBottom: "28px", position: "relative" }}>
              <div style={{
                display: "inline-block",
                position: "relative"
              }}>
                <img
                  src={userPhoto}
                  alt="Foto de perfil"
                  style={{
                    width: "130px",
                    height: "130px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid #4f8cff",
                    boxShadow: "0 2px 12px rgba(79,140,255,0.10)",
                    marginBottom: "10px",
                    background: "#f4f6fa"
                  }}
                />
                <label htmlFor="photo-upload" style={{
                  position: "absolute",
                  right: "8px",
                  bottom: "12px",
                  background: "#fff",
                  borderRadius: "50%",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                  border: "2px solid #4f8cff",
                  width: "38px",
                  height: "38px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    id="photo-upload"
                    style={{ display: "none" }}
                  />
                  <span style={{ fontSize: "20px" }}>📷</span>
                </label>
              </div>
              <div style={{ fontSize: "13px", color: "#888", marginTop: "6px" }}>
                Clique no ícone para alterar sua foto
              </div>
            </div>
            <div style={{ marginBottom: "18px" }}>
              <label style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
                color: "#2a2a2a",
                letterSpacing: "0.01em"
              }}>Nome completo</label>
              <Input
                value={userData.nome}
                onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                placeholder="Seu nome completo"
                style={{ background: "#f7faff" }}
              />
            </div>
            <div style={{ marginBottom: "18px" }}>
              <label style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
                color: "#2a2a2a",
                letterSpacing: "0.01em"
              }}>E-mail</label>
              <Input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                placeholder="Seu e-mail"
                style={{ background: "#f7faff" }}
              />
            </div>
            <div style={{ marginBottom: "18px" }}>
              <label style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
                color: "#2a2a2a",
                letterSpacing: "0.01em"
              }}>Endereço</label>
              <Input
                value={userData.endereco}
                onChange={(e) => setUserData({ ...userData, endereco: e.target.value })}
                placeholder="Seu endereço"
                style={{ background: "#f7faff" }}
              />
            </div>
            <div style={{ marginTop: "28px", textAlign: "center" }}>
              <Button
                $primary
                style={{
                  padding: "12px 36px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(79,140,255,0.10)"
                }}
                onClick={handleSave}
              >
                💾 Salvar Alterações
              </Button>
            </div>
          </div>
        )}

        {/* MINHAS RESERVAS */}
        {activeMenu === "reservas" && (
          <DashboardContainer>
            <Title>
              <span role="img" aria-label="reservas">📖</span> Minhas Reservas
            </Title>
            {/* FILTROS */}
            <div style={{
              display: 'grid',
              gap: '18px',
              marginBottom: '32px',
              background: 'linear-gradient(120deg, #fff 60%, #e0e7ff 100%)',
              padding: '24px 20px',
              borderRadius: '14px',
              boxShadow: '0 4px 16px rgba(30,40,90,0.07)',
              flexWrap: 'wrap',
              alignItems: 'flex-end'
            }}>
              <div style={{ flex: '1 1 200px', minWidth: 180 }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#2a2a2a'
                }}>Filtrar por data</label>
                <Input
                  type="date"
                  value={filtroData}
                  onChange={e => setFiltroData(e.target.value)}
                  style={{ background: "#f7faff" }}
                />
              </div>
              <div style={{ flex: '1 1 200px', minWidth: 180 }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#2a2a2a'
                }}>Filtrar por quadra</label>
                <select style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: "#f7faff"
                }}
                  value={filtroQuadra}
                  onChange={e => setFiltroQuadra(e.target.value)}
                >
                  <option value="">Todas as quadras</option>
                  {Quadras.map(quadra => (
                    <option key={quadra.id} value={quadra.id}>{quadra.nome}</option>
                  ))}
                </select>
              </div>
              <div style={{
                flex: '0 1 120px',
                display: 'flex',
                alignItems: 'flex-end',
                gap: 8,
                width: '100%',
              }}>
                <Button
                  $primary
                  style={{
                    width: '100%',
                    padding: "10px 0",
                    fontWeight: 600,
                    fontSize: "15px"
                  }}
                  onClick={() => { /* Filtro já é reativo, botão é apenas visual */ }}
                  tabIndex={-1}
                >
                  <span style={{ marginRight: '5px' }}>🔍</span> Filtrar
                </Button>
                {(filtroData || filtroQuadra) && (
                  <Button
                    $small
                    style={{
                      background: "#f0f0f0",
                      color: "#333",
                      fontWeight: 500,
                      padding: "10px 0",
                      width: '100%',
                      fontSize: "15px"
                    }}
                    onClick={() => { setFiltroData(""); setFiltroQuadra(""); }}
                  >
                    <span style={{ marginRight: '5px' }}>🧹</span> Limpar
                  </Button>
                )}
              </div>
            </div>
            {/* TABELA DE RESERVAS */}
                          <div style={{
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            padding: '0',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            overflow: 'hidden'
                          }}>
                            <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontSize: '15px'
                            }}>
                            <thead>
                              <tr style={{
                              backgroundColor: '#1a1a2e',
                              color: 'white',
                              fontWeight: 600
                              }}>
                              <th style={{ padding: '15px 12px', textAlign: 'left', minWidth: 180 }}>Quadra</th>
                              <th style={{ padding: '15px 12px', minWidth: 90 }}>Data</th>
                              <th style={{ padding: '15px 12px', minWidth: 80 }}>Horário</th>
                              <th style={{ padding: '15px 12px', minWidth: 120 }}>Reservado</th>
                              <th style={{ padding: '15px 12px', minWidth: 90 }}>Status</th>
                              <th style={{ padding: '15px 12px', minWidth: 110, textAlign: 'center' }}>Documento</th>
                              <th style={{ padding: '15px 12px', minWidth: 90, textAlign: 'center' }}>Ações</th>
                              </tr>
                            </thead>
                            <tbody>
                              {reservasFiltradas.map(reserva => (
                              <tr
                                key={reserva.id}
                                style={{
                                background: reserva.status === "Cancelado" ? "#f8d7da" : undefined,
                                opacity: reserva.status === "Cancelado" ? 0.6 : 1,
                                transition: 'background 0.2s'
                                }}
                              >
                                <td style={{ padding: '14px 12px', verticalAlign: 'middle' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <img
                                  src={reserva.quadra.imagem}
                                  alt={reserva.quadra.nome}
                                  style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '6px',
                                    objectFit: 'cover',
                                    border: '1px solid #e0e0e0'
                                  }}
                                  />
                                  <div>
                                  <div style={{ fontWeight: '600', fontSize: '14px' }}>{reserva.quadra.nome}</div>
                                  <div style={{ fontSize: '12px', color: '#666' }}>{reserva.quadra.bairro}</div>
                                  </div>
                                </div>
                                </td>
                                <td style={{ padding: '14px 12px', verticalAlign: 'middle' }}>
                                <div style={{ fontWeight: '500', fontSize: '14px' }}>
                                  {new Date(reserva.data).toLocaleDateString('pt-BR')}
                                </div>
                                <div style={{ fontSize: '12px', color: '#666' }}>
                                  {new Date(reserva.data).toLocaleDateString('pt-BR', { weekday: 'short' })}
                                </div>
                                </td>
                                <td style={{ padding: '14px 12px', verticalAlign: 'middle' }}>
                                <span style={{
                                  display: 'inline-block',
                                  backgroundColor: '#e6f7ff',
                                  color: '#0077b6',
                                  padding: '4px 10px',
                                  borderRadius: '12px',
                                  fontWeight: '600',
                                  fontSize: '13px'
                                }}>
                                  {reserva.horario}
                                </span>
                                </td>
                                <td style={{ padding: '14px 12px', verticalAlign: 'middle' }}>
                                <div style={{ fontWeight: '500', fontSize: '14px' }}>
                                  {new Date(reserva.dataReserva).toLocaleDateString('pt-BR')}
                                </div>
                                <div style={{ fontSize: '12px', color: '#666' }}>
                                  às {new Date(reserva.dataReserva).toLocaleTimeString('pt-BR', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                  })}
                                </div>
                                </td>
                                <td style={{ padding: '14px 12px', verticalAlign: 'middle' }}>
                                <span style={{
                                  padding: '5px 10px',
                                  borderRadius: '12px',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  display: 'inline-block',
                                  backgroundColor:
                                  reserva.status === 'Confirmado' ? '#e6f7ee' :
                                  reserva.status === 'Pendente' ? '#fff8e6' : '#ffebee',
                                  color:
                                  reserva.status === 'Confirmado' ? '#28a745' :
                                  reserva.status === 'Pendente' ? '#ffc107' : '#dc3545'
                                }}>
                                  {reserva.status}
                                </span>
                                </td>
                                <td style={{ padding: '14px 12px', textAlign: 'center', verticalAlign: 'middle' }}>
                                {reserva.status !== 'Cancelado' ? (
                                  <Button
                                  $small
                                  style={{
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    minWidth: '90px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    padding: '6px 10px',
                                    justifyContent: 'center'
                                  }}
                                  onClick={() => gerarAlvaraPDF(reserva)}
                                  >
                                  <span>📄</span>
                                  <span style={{ fontSize: '12px' }}>Emitir Alvará</span>
                                  </Button>
                                ) : (
                                  <span style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
                                  Indisponível
                                  </span>
                                )}
                                </td>
                                <td style={{ padding: '14px 12px', textAlign: 'center', verticalAlign: 'middle' }}>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                  <Button
                                  $small
                                  style={{
                                    backgroundColor: '#f0f0f0',
                                    color: '#333',
                                    minWidth: '30px',
                                    padding: '6px'
                                  }}
                                  onClick={() => {
                                    alert(`📋 Detalhes da reserva:
                    🏟️ Quadra: ${reserva.quadra.nome}
                    📅 Data: ${new Date(reserva.data).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    ⏰ Horário: ${reserva.horario}
                    📝 Reservado em: ${new Date(reserva.dataReserva).toLocaleString('pt-BR')}
                    🆔 Código: ${reserva.codigo}
                    📌 Status: ${reserva.status}`);
                                  }}
                                  >
                                  👁️
                                  </Button>
                                  {reserva.status !== 'Cancelado' && (
                                  <Button
                                    $small
                                    $danger
                                    style={{ minWidth: '30px', padding: '6px' }}
                                    onClick={() => {
                                    if (window.confirm(`Deseja realmente cancelar a reserva na ${reserva.quadra.nome} para ${new Date(reserva.data).toLocaleDateString('pt-BR')} às ${reserva.horario}?`)) {
                                      setUserData(prev => ({
                                      ...prev,
                                      reservas: prev.reservas.map(r =>
                                        r.id === reserva.id ? { ...r, status: 'Cancelado' } : r
                                      )
                                      }));
                                      alert('Reserva cancelada com sucesso!');
                                    }
                                    }}
                                    >
                                    ❌
                                    </Button>
                                    )}
                                  </div>
                                  </td>
                                  </tr>
                                  ))}
                                  {reservasFiltradas.length === 0 && (
                                  <tr>
                                  <td colSpan={7} style={{ textAlign: 'center', padding: '50px 20px', color: '#666' }}>
                                  <div style={{ fontSize: '60px', marginBottom: '20px', opacity: '0.5' }}>📭</div>
                                  <h3 style={{ marginBottom: '15px', color: '#444' }}>Nenhuma reserva encontrada</h3>
                                  <p style={{ maxWidth: '500px', margin: '0 auto 25px', lineHeight: '1.6' }}>
                                    Você ainda não fez nenhuma reserva ou não há reservas com os filtros aplicados.
                                  </p>
                                  <Button
                                    $primary
                                    style={{ marginTop: '10px', padding: '12px 24px' }}
                                    onClick={() => setActiveMenu('dashboard')}
                                  >
                                    🏀 Reservar uma quadra agora
                                  </Button>
                                  </td>
                                  </tr>
                                  )}
                                </tbody>
                                </table>
                                <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '15px 20px',
                                backgroundColor: '#f9f9f9',
                                borderTop: '1px solid #eee'
                                }}>
                                <div style={{ color: '#666', fontSize: '14px', fontWeight: '500' }}>
                                  Mostrando {reservasFiltradas.length} reserva{reservasFiltradas.length !== 1 ? 's' : ''}
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <Button $small disabled style={{ minWidth: '1px', padding: '6px 10px', fontSize: '13px' }}>
                                  ⏪ Anterior
                                  </Button>
                                  <Button $small $primary style={{ minWidth: '28px', padding: '6px 10px', fontSize: '13px' }}>
                                  1
                                  </Button>
                                  <Button $small disabled style={{ minWidth: '60px', padding: '6px 10px', fontSize: '13px' }}>
                                  Próximo ⏩
                                  </Button>
                                </div>
                                </div>
                                </div>
            </DashboardContainer>
        )}
      </Content>
    </Layout>
  );
};

export default Home;