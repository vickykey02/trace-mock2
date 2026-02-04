//hier auch Button zum Impact Screen hin --> Einblendung "so viel hast du schon erreicht" 
//mit cooler Grafik/Info und "mehr erfahren" mit Link zum Impact Screen

import { useSubmittedActions } from '../context/SubmittedActionsContext';
import { Link } from 'react-router-dom';

const SubmittedActionCard = ({ action, onApprove, onReject }) => {
  const statusColors = {
    pending: { bg: '#fff3cd', border: '#ffc107', text: '#856404' },
    approved: { bg: '#d4edda', border: '#28a745', text: '#155724' },
    rejected: { bg: '#f8d7da', border: '#dc3545', text: '#721c24' }
  };

  const statusLabels = {
    pending: '⏳ In Prüfung',
    approved: '✓ Abgeschlossen',
    rejected: '✗ Fehlgeschlagen'
  };

  const colors = statusColors[action.status] || statusColors.pending;

  return (
    <div style={{
      background: colors.bg,
      border: `2px solid ${colors.border}`,
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ color: colors.text, fontWeight: 'bold', marginBottom: 5 }}>
            {statusLabels[action.status]}
          </div>
          <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>{action.category}</h3>
          <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: 14 }}>
            {action.actionName && <strong>Handlung: </strong>}{action.actionName}
          </p>
          <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: 14 }}>
            {action.description}
          </p>
          <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: 14 }}>
            {<strong>Punkte: </strong>}{action.points}
          </p>
          <p style={{ margin: 0, color: '#999', fontSize: 12 }}>
            Eingereicht: {new Date(action.submittedAt).toLocaleDateString('de-DE')}
          </p>
        </div>
        {action.status === 'pending' && (
          <div style={{ marginLeft: 15, display: 'flex', gap: 8 }}>
            {/*<button
              onClick={() => onApprove(action.id)}
              style={{
                background: '#28a745',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: 5,
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 'bold'
              }}
            >
              ✓
            </button>
            <button
              onClick={() => onReject(action.id)}
              style={{
                background: '#dc3545',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: 5,
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 'bold'
              }}
            >
              ✗
            </button>*/}
          </div>
        )}
      </div>
    </div>
  );
};

const Past = () => {
  const { submitted, updateStatus } = useSubmittedActions();

  const pending = submitted.filter(a => a.status === 'pending');
  const approved = submitted.filter(a => a.status === 'approved');
  const rejected = submitted.filter(a => a.status === 'rejected');

  return (
    <div style={{ padding: 20, paddingBottom: 100 }}>
      <h1 style={{textAlign: 'center', marginTop: -7}}>
        Verlauf
      </h1>

      {/* Impact Einblendung */}
      <Link to="/impact" style={{ textDecoration: 'none'}}> 
        <div style={{
          //background: 'linear-gradient(135deg, #128b09 0%, #1db954 100%)',
          background: 'url(/Sustainability.png)',
          borderRadius: '10px',
          padding: '12px 15px',
          marginBottom: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          color: '#fff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
            <span style={{ fontSize: '20px' }}>💡</span>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '11px', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Dein Impact</div>
              <div style={{ fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap' }}>Schau dir an, was dein Handeln schon bewirkt hat.</div>
            </div>
          </div>
          <span style={{ fontSize: '18px', marginLeft: '10px' }}>→</span>
        </div>
      </Link>


      {/* In Prüfung */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ color: '#ffc107', marginBottom: 20 }}>
          ⏳ In Prüfung ({pending.length})
        </h2>
        {pending.length > 0 ? (
          pending.map(action => (
            <SubmittedActionCard
              key={action.id}
              action={action}
              points={action.points}
              onApprove={(id) => updateStatus(id, 'approved')}
              onReject={(id) => updateStatus(id, 'rejected')}
            />
          ))
        ) : (
          <p style={{ color: '#999' }}>Keine Handlungen in Prüfung</p>
        )}
      </section>

      {/* Abgeschlossen */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ color: '#28a745', marginBottom: 20 }}>
          ✓ Abgeschlossen ({approved.length})
        </h2>
        {approved.length > 0 ? (
          approved.map(action => (
            <SubmittedActionCard
              key={action.id}
              action={action}
              points={action.points}
              onApprove={() => {}}
              onReject={() => {}}
            />
          ))
        ) : (
          <p style={{ color: '#999' }}>Keine abgeschlossenen Handlungen</p>
        )}
      </section>

      {/* Fehlgeschlagen */}
      <section>
        <h2 style={{ color: '#dc3545', marginBottom: 20 }}>
          ✗ Fehlgeschlagen ({rejected.length})
        </h2>
        {rejected.length > 0 ? (
          rejected.map(action => (
            <SubmittedActionCard
              key={action.id}
              action={action}
              points={action.points}
              onApprove={() => {}}
              onReject={() => {}}
            />
          ))
        ) : (
          <p style={{ color: '#999' }}>Keine fehlgeschlagenen Handlungen</p>
        )}
      </section>
    </div>
  );
};

export default Past;