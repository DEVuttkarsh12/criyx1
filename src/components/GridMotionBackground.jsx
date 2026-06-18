import appsVisual from '../assets/service-apps.svg';
import automationVisual from '../assets/service-automation.svg';
import agentsVisual from '../assets/service-agents.svg';
import voiceVisual from '../assets/service-voice.svg';
import GridMotion from './GridMotion';
import './GridMotionBackground.css';

function BackgroundTile({ eyebrow, title, body }) {
  return (
    <div className="gridMotionTile">
      <span className="gridMotionTile__eyebrow">{eyebrow}</span>
      <strong className="gridMotionTile__title">{title}</strong>
      <span className="gridMotionTile__body">{body}</span>
    </div>
  );
}

const backgroundItems = [
  <BackgroundTile
    key="workflow-systems"
    eyebrow="Criyx"
    title="Workflow Systems"
    body="Automation built around actual operating constraints."
  />,
  automationVisual,
  'AI Automations',
  <BackgroundTile
    key="voice-agents"
    eyebrow="Product"
    title="Voice Agents"
    body="Qualification, intake, support, and handoff."
  />,
  voiceVisual,
  <BackgroundTile
    key="custom-software"
    eyebrow="Delivery"
    title="Custom Software"
    body="Purpose-built applications for workflow execution."
  />,
  <BackgroundTile
    key="operator-tools"
    eyebrow="Interfaces"
    title="Operator Tools"
    body="Dashboards and review layers for human control."
  />,
  appsVisual,
  <BackgroundTile
    key="web-apps"
    eyebrow="Product"
    title="Modern Web Apps"
    body="Client-facing and internal tools with AI-native logic."
  />,
  <BackgroundTile
    key="marketing-ops"
    eyebrow="Agents"
    title="Marketing Ops"
    body="Campaign planning, drafting, and launch support."
  />,
  agentsVisual,
  <BackgroundTile
    key="ai-agents"
    eyebrow="Systems"
    title="AI Agents"
    body="Autonomous steps with guardrails, routing, and reporting."
  />,
  <BackgroundTile
    key="orchestration"
    eyebrow="Stack"
    title="Connected Orchestration"
    body="Agents, automations, software, and reporting in one layer."
  />,
  automationVisual,
];

export default function GridMotionBackground({
  prefersReducedMotion = false,
}) {
  return (
    <div className="gridMotionBackground" aria-hidden="true">
      <GridMotion
        items={backgroundItems}
        gradientColor="rgba(167, 84, 37, 0.18)"
        disableAnimation={prefersReducedMotion}
      />
    </div>
  );
}
