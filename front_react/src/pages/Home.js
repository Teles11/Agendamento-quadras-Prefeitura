import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../components/Button";
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
// Campo de entrada com estilo
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

// Mock de reservas
const reservasMock = {
  1: ["09:00", "18:00"],
  2: ["10:00", "15:00", "19:00"],
  3: ["08:00", "16:00"],
};

// Componente funcional
const Home = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [selectedQuadra, setSelectedQuadra] = useState(null);
  const [data, setData] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");

  // Estado para dados do usuário
  const [userData, setUserData] = useState({
    nome: "João Silva",
    email: "joao.silva@email.com",
    endereco: "Av. Principal, 123 - Centro, Cidade - UF",
  });

  // Estado para a foto de perfil
  const [userPhoto, setUserPhoto] = useState("https://via.placeholder.com/120");

  // Função para trocar foto
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUserPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Função para salvar alterações
  const handleSave = () => {
    alert("✅ Dados atualizados com sucesso!");
    console.log("Dados atualizados:", userData);
    console.log("Foto atualizada:", userPhoto);
  };

  const handleConfirmar = () => {
    if (!data || !horarioSelecionado) {
      alert("Escolha a data e o horário antes de confirmar!");
      return;
    }
    alert(`✅ ${selectedQuadra.nome} agendada em ${data} às ${horarioSelecionado}`);
    setSelectedQuadra(null);
  };

  const horariosOcupados = reservasMock[selectedQuadra?.id] || [];

  return (
    <Layout>
      {/* Sidebar */}
      <Sidebar>
        <SidebarTitle>🏀 Quadras</SidebarTitle>
        <SidebarItem active={activeMenu === "dashboard"} onClick={() => { setActiveMenu("dashboard"); setSelectedQuadra(null); }}>
          Dashboard
        </SidebarItem>
        <SidebarItem active={activeMenu === "conta"} onClick={() => setActiveMenu("conta")}>
          Minha Conta
        </SidebarItem>
        <SidebarItem active={activeMenu === "reservas"} onClick={() => setActiveMenu("reservas")}>
          Minhas Reservas
        </SidebarItem>
        <SidebarItem active={activeMenu === "faq"} onClick={() => setActiveMenu("faq")}>
          FAQ
        </SidebarItem>
      </Sidebar>

      {/* Conteúdo */}
      <Content>
        {/* Dashboard de Quadras */}
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

        {/* Tela de Detalhes da Quadra */}
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
            <Input type="date" value={data} onChange={(e) => setData(e.target.value)} />
            <h3>Selecione o Horário:</h3>
            <HorariosGrid>
              {horariosDisponiveis.map((hora) => (
                <HorarioButton
                  key={hora}
                  ocupado={horariosOcupados.includes(hora)}
                  disabled={horariosOcupados.includes(hora)}
                  onClick={() => setHorarioSelecionado(hora)}
                >
                  {hora}
                </HorarioButton>
              ))}
            </HorariosGrid>
            <div style={{ marginTop: "20px" }}>
              <Button $primary onClick={handleConfirmar}>Confirmar</Button>
            </div>
          </DetalheContainer>
        )}

        {/* Minha Conta */}
        {activeMenu === "conta" && (
          <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 3px 6px rgba(0,0,0,0.1)" }}>
            <Title>👤 Minha Conta</Title>
            {/* Foto de Perfil */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img
                src={userPhoto}
                alt="Foto de perfil"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #ddd",
                  marginBottom: "10px",
                }}
              />
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  id="photo-upload"
                  style={{ display: "none" }}
                />
                <label htmlFor="photo-upload">
                  <Button as="span" style={{ cursor: "pointer" }}>
                    📷 Alterar Foto
                  </Button>
                </label>
              </div>
            </div>
            {/* Formulário */}
            <div>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#333" }}>Nome</label>
              <Input
                value={userData.nome}
                onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#333" }}>E-mail</label>
              <Input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#333" }}>Endereço</label>
              <Input
                value={userData.endereco}
                onChange={(e) => setUserData({ ...userData, endereco: e.target.value })}
              />
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Button $primary onClick={handleSave}>
                💾 Salvar Alterações
              </Button>
            </div>
          </div>
        )}

        {/* Minhas Reservas */}
        {activeMenu === "reservas" && (
          <div>
            <Title>📖 Minhas Reservas</Title>
            <p>Aqui aparecerá a lista de reservas feitas pelo usuário.</p>
          </div>
        )}

        {/* FAQ */}
        {activeMenu === "faq" && (
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <Title>❓ Perguntas Frequentes (FAQ)</Title>
            <div style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
            }}>
              <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
                <h3 style={{ margin: "0 0 10px", color: "#222" }}>1. Como faço para reservar uma quadra?</h3>
                <p style={{ margin: "0", color: "#555", lineHeight: "1.5" }}>
                  Basta acessar o <strong>Dashboard</strong>, selecionar a quadra desejada, escolher uma data e um horário disponível. Após confirmar, sua reserva será registrada.
                </p>
              </div>

              <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
                <h3 style={{ margin: "0 0 10px", color: "#222" }}>2. Posso alterar ou cancelar minha reserva?</h3>
                <p style={{ margin: "0", color: "#555", lineHeight: "1.5" }}>
                  Sim! Acesse a seção <strong>Minhas Reservas</strong> e clique em "Cancelar" ou entre em contato com a administração com, no mínimo, 2 horas de antecedência.
                </p>
              </div>

              <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
                <h3 style={{ margin: "0 0 10px", color: "#222" }}>3. Quais são os horários de funcionamento?</h3>
                <p style={{ margin: "0", color: "#555", lineHeight: "1.5" }}>
                  As quadras estão disponíveis das <strong>08:00 às 20:00</strong>, de segunda a domingo.
                </p>
              </div>

              <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
                <h3 style={{ margin: "0 0 10px", color: "#222" }}>4. É cobrado algum valor para reserva?</h3>
                <p style={{ margin: "0", color: "#555", lineHeight: "1.5" }}>
                  Sim, há uma taxa simbólica de reserva que varia conforme o tipo de quadra. O valor será exibido antes da confirmação.
                </p>
              </div>

              <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
                <h3 style={{ margin: "0 0 10px", color: "#222" }}>5. Posso reservar com antecedência?</h3>
                <p style={{ margin: "0", color: "#555", lineHeight: "1.5" }}>
                  Sim! Você pode reservar até <strong>7 dias de antecedência</strong>. Reservas com mais tempo precisam de autorização especial.
                </p>
              </div>

              <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
                <h3 style={{ margin: "0 0 10px", color: "#222" }}>6. O que acontece se eu não comparecer?</h3>
                <p style={{ margin: "0", color: "#555", lineHeight: "1.5" }}>
                  Faltas sem aviso podem resultar em bloqueio temporário do sistema de reservas. Evite transtornos e cancele com antecedência.
                </p>
              </div>

              <div style={{ marginTop: "30px", textAlign: "center", paddingTop: "20px", borderTop: "1px solid #eee" }}>
                <p style={{ color: "#666" }}>
                  <strong>Outras dúvidas?</strong> Entre em contato: <a href="mailto:suporte@quadras.com" style={{ color: "#007bff" }}>suporte@quadras.com</a>
                </p>
              </div>
            </div>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default Home;