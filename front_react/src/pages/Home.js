import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../components/Button";

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
    font-weight: bold; /* Nome em negrito */
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
`;

// 25 Quadras cadastradas com nome, bairro e descrição
const Quadras = [
  { id: 1, nome: "Quadra Central", bairro: "Centro", descricao: "Quadra poliesportiva oficial, ideal para campeonatos.", imagem: "https://picsum.photos/400/200?random=1" },
  { id: 2, nome: "Arena Society", bairro: "Pindorama", descricao: "Gramado sintético de última geração para futebol society.", imagem: "https://picsum.photos/400/200?random=2" },
  { id: 3, nome: "Quadra de Areia", bairro: "Praia", descricao: "Perfeita para vôlei e futevôlei na areia.", imagem: "https://picsum.photos/400/200?random=3" },
  { id: 4, nome: "Quadra Premium", bairro: "São Benedito", descricao: "Espaço moderno, piso emborrachado e iluminação profissional.", imagem: "https://picsum.photos/400/200?random=4" },
  { id: 5, nome: "Quadra Kids", bairro: "Morro da Mariana", descricao: "Área infantil com estrutura adaptada e segura.", imagem: "https://picsum.photos/400/200?random=5" },
  { id: 6, nome: "Quadra Norte", bairro: "Rodoviária", descricao: "Espaço amplo, ideal para treinos e jogos recreativos.", imagem: "https://picsum.photos/400/200?random=6" },
  { id: 7, nome: "Quadra Leste", bairro: "Bairro Piauí", descricao: "Quadra aberta com arquibancada lateral.", imagem: "https://picsum.photos/400/200?random=7" },
  { id: 8, nome: "Quadra Oeste", bairro: "Catanduvas", descricao: "Iluminação noturna de alta performance.", imagem: "https://picsum.photos/400/200?random=8" },
  { id: 9, nome: "Quadra Sul", bairro: "João XXIII", descricao: "Estrutura com cobertura parcial para sol e chuva.", imagem: "https://picsum.photos/400/200?random=9" },
  { id: 10, nome: "Quadra Master", bairro: "Planalto", descricao: "Espaço premium para treinos de alto nível.", imagem: "https://picsum.photos/400/200?random=10" },
  { id: 11, nome: "Quadra Olímpica", bairro: "Nova Parnaíba", descricao: "Quadra padrão olímpico para torneios oficiais.", imagem: "https://picsum.photos/400/200?random=11" },
  { id: 12, nome: "Arena Multiuso", bairro: "Rosápolis", descricao: "Pode ser adaptada para diferentes esportes.", imagem: "https://picsum.photos/400/200?random=12" },
  { id: 13, nome: "Quadra Recreativa", bairro: "Sabiazal", descricao: "Ambiente descontraído, ideal para lazer.", imagem: "https://picsum.photos/400/200?random=13" },
  { id: 14, nome: "Quadra Indoor", bairro: "Alto Santa Maria", descricao: "Espaço fechado climatizado.", imagem: "https://picsum.photos/400/200?random=14" },
  { id: 15, nome: "Quadra Aberta", bairro: "Dom Rufino", descricao: "Perfeita para partidas ao ar livre.", imagem: "https://picsum.photos/400/200?random=15" },
  { id: 16, nome: "Arena Elite", bairro: "Ilha Grande", descricao: "Estrutura premium com arquibancadas confortáveis.", imagem: "https://picsum.photos/400/200?random=16" },
  { id: 17, nome: "Quadra Popular", bairro: "Mão Santa", descricao: "Mais acessível, ótima para recreação.", imagem: "https://picsum.photos/400/200?random=17" },
  { id: 18, nome: "Quadra Vip", bairro: "Cearazinho", descricao: "Espaço exclusivo para grupos fechados.", imagem: "https://picsum.photos/400/200?random=18" },
  { id: 19, nome: "Arena do Sol", bairro: "Coqueiro", descricao: "Ambiente aberto e ensolarado, ideal para esportes de verão.", imagem: "https://picsum.photos/400/200?random=19" },
  { id: 20, nome: "Arena da Lua", bairro: "Floriópolis", descricao: "Iluminação especial para jogos noturnos.", imagem: "https://picsum.photos/400/200?random=20" },
  { id: 21, nome: "Quadra FastPlay", bairro: "Vila Nova", descricao: "Estrutura prática para jogos rápidos.", imagem: "https://picsum.photos/400/200?random=21" },
  { id: 22, nome: "Quadra Tech", bairro: "Igaraçu", descricao: "Equipamentos modernos para análise de desempenho.", imagem: "https://picsum.photos/400/200?random=22" },
  { id: 23, nome: "Quadra Família", bairro: "Cantagalo", descricao: "Espaço para lazer em família, com arquibancada infantil.", imagem: "https://picsum.photos/400/200?random=23" },
  { id: 24, nome: "Arena Pro", bairro: "Curtume", descricao: "Quadra voltada para atletas profissionais.", imagem: "https://picsum.photos/400/200?random=24" },
  { id: 25, nome: "Quadra do Parque", bairro: "São José", descricao: "Integrada à área verde, ambiente natural.", imagem: "https://picsum.photos/400/200?random=25" },
];

// Horários disponíveis
const horariosDisponiveis = [
  "08:00", "09:00", "10:00",
  "14:00", "15:00", "16:00",
  "18:00", "19:00", "20:00"
];

// Mock de reservas existentes
const reservasMock = {
  1: ["09:00", "18:00"],
  2: ["10:00", "15:00", "19:00"],
  3: ["08:00", "16:00"],
};

const Home = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [selectedQuadra, setSelectedQuadra] = useState(null);
  const [data, setData] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");

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
        <SidebarItem 
          active={activeMenu === "dashboard"} 
          onClick={() => { setActiveMenu("dashboard"); setSelectedQuadra(null); }}
        >
          Dashboard
        </SidebarItem>
        <SidebarItem 
          active={activeMenu === "conta"} 
          onClick={() => setActiveMenu("conta")}
        >
          Minha Conta
        </SidebarItem>
        <SidebarItem 
          active={activeMenu === "reservas"} 
          onClick={() => setActiveMenu("reservas")}
        >
          Minhas Reservas
        </SidebarItem>
        <SidebarItem 
          active={activeMenu === "faq"} 
          onClick={() => setActiveMenu("faq")}
        >
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
            <Input 
              type="date" 
              value={data} 
              onChange={(e) => setData(e.target.value)} 
            />

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
          <div>
            <Title>👤 Minha Conta</Title>
            <p>Aqui você pode atualizar seus dados pessoais.</p>
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
          <div>
            <Title>❓ FAQ</Title>
            <p>Aqui vai a seção de perguntas frequentes.</p>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default Home;
