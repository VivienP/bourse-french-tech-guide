import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Bourse French Tech"

interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ConversationReportProps {
  score?: number
  conversation?: ConversationMessage[]
  prospectEmail?: string
  prospectPhone?: string
}

const ConversationReportEmail = ({ score, conversation, prospectEmail, prospectPhone }: ConversationReportProps) => {
  const isEligible = score !== undefined && score !== null && score >= 2.5
  const scoreLabel = isEligible ? 'Projet éligible' : 'Projet nécessitant des ajustements'

  return (
    <Html lang="fr" dir="ltr">
      <Head />
      <Preview>Votre rapport d'éligibilité — {SITE_NAME}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>{SITE_NAME}</Heading>
            <Text style={subtitle}>Rapport d'éligibilité</Text>
          </Section>

          <Hr style={divider} />

          {/* Score */}
          {score !== undefined && score !== null && (
            <Section style={scoreSection}>
              <Text style={scoreText}>
                Score : <strong>{score}/5</strong> — {scoreLabel}
              </Text>
            </Section>
          )}

          <Hr style={divider} />

          {/* Prospect contact info (CC email only) */}
          {(prospectEmail || prospectPhone) && (
            <Section style={contactSection}>
              <Text style={contactTitle}>📋 Coordonnées du prospect</Text>
              {prospectEmail && <Text style={contactInfo}>Email : {prospectEmail}</Text>}
              {prospectPhone && <Text style={contactInfo}>Tél : {prospectPhone}</Text>}
            </Section>
          )}

          {/* Conversation */}
          <Heading style={h2}>Détail de la conversation</Heading>

          {conversation && conversation.length > 0 ? (
            conversation.map((msg, i) => (
              <Section key={i} style={msg.role === 'user' ? userMsgSection : assistantMsgSection}>
                <Text style={roleLabel}>
                  {msg.role === 'user' ? '🧑 Vous' : '🤖 Assistant'}
                </Text>
                <Text style={msgContent}>{msg.content}</Text>
              </Section>
            ))
          ) : (
            <Text style={msgContent}>Aucun message dans la conversation.</Text>
          )}

          <Hr style={divider} />

          <Text style={footer}>
            Cet email a été envoyé automatiquement par {SITE_NAME} suite à votre évaluation d'éligibilité.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: ConversationReportEmail,
  subject: (data: Record<string, any>) => {
    const s = data.score
    if (s !== undefined && s !== null) {
      return `Votre rapport d'éligibilité — Score ${s}/5`
    }
    return `Votre rapport d'éligibilité — Bourse French Tech`
  },
  displayName: 'Rapport de conversation',
  previewData: {
    score: 3.2,
    conversation: [
      { role: 'assistant', content: 'Votre entreprise est-elle une société française déjà immatriculée ?' },
      { role: 'user', content: 'Oui' },
      { role: 'assistant', content: 'Votre société a-t-elle été immatriculée il y a moins d\'un an ?' },
      { role: 'user', content: 'Oui' },
    ],
  },
} satisfies TemplateEntry

// Styles
const NAVY = '#1B2A4A'

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '32px 24px', maxWidth: '600px', margin: '0 auto' }

const header = { textAlign: 'center' as const, marginBottom: '8px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: NAVY, margin: '0 0 4px' }
const subtitle = { fontSize: '14px', color: '#6b7280', margin: '0' }

const h2 = { fontSize: '16px', fontWeight: 'bold' as const, color: NAVY, margin: '24px 0 12px' }

const divider = { borderColor: '#e5e7eb', margin: '20px 0' }

const scoreSection = {
  backgroundColor: '#f0f4ff',
  borderRadius: '8px',
  padding: '16px',
  textAlign: 'center' as const,
}
const scoreText = { fontSize: '16px', color: NAVY, margin: '0', fontWeight: '600' as const }

const contactSection = {
  backgroundColor: '#fef9e7',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '8px',
  border: '1px solid #f5e6a3',
}
const contactTitle = { fontSize: '14px', fontWeight: 'bold' as const, color: NAVY, margin: '0 0 8px' }
const contactInfo = { fontSize: '13px', color: '#374151', margin: '0 0 4px', lineHeight: '1.5' }

const roleLabel = {
  fontSize: '11px',
  fontWeight: 'bold' as const,
  color: '#6b7280',
  textTransform: 'uppercase' as const,
  margin: '0 0 4px',
  letterSpacing: '0.5px',
}

const userMsgSection = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '12px 16px',
  marginBottom: '8px',
  borderLeft: `3px solid ${NAVY}`,
}
const assistantMsgSection = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '12px 16px',
  marginBottom: '8px',
  border: '1px solid #e5e7eb',
}

const msgContent = { fontSize: '13px', color: '#374151', lineHeight: '1.6', margin: '0', whiteSpace: 'pre-wrap' as const }

const footer = { fontSize: '11px', color: '#9ca3af', textAlign: 'center' as const, margin: '24px 0 0' }
