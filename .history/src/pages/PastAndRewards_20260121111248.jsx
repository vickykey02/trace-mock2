import { useSubmittedActions } from '../context/SubmittedActionsContext';

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
      padding: 15,
      marginBottom: 15,
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
          <p style={{ margin: 0, color: '#999', fontSize: 12 }}>
            Eingereicht: {new Date(action.submittedAt).toLocaleDateString('de-DE')}
          </p>
        </div>
        {action.status === 'pending' && (
          <div style={{ marginLeft: 15, display: 'flex', gap: 8 }}>
            <button
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
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const PastAndRewards = () => {
  const { submitted, updateStatus } = useSubmittedActions();

  const pending = submitted.filter(a => a.status === 'pending');
  const approved = submitted.filter(a => a.status === 'approved');
  const rejected = submitted.filter(a => a.status === 'rejected');

  return (
    <div style={{ padding: 30, paddingBottom: 100 }}>
      <h1>Verlauf und Belohnungen</h1>

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
              onApprove={(id) => updateStatus(id, 'approved')}
              onReject={(id) => updateStatus(id, 'rejected')}
            />
          ))
        ) : (
          <p style={{ color: '#999' }}>Keine Handlungen in Prüfung</p>
        )}
      </section>

      {/* Genehmigt */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ color: '#28a745', marginBottom: 20 }}>
          ✓ Genehmigt ({approved.length})
        </h2>
        {approved.length > 0 ? (
          approved.map(action => (
            <SubmittedActionCard
              key={action.id}
              action={action}
              onApprove={() => {}}
              onReject={() => {}}
            />
          ))
        ) : (
          <p style={{ color: '#999' }}>Keine genehmigten Handlungen</p>
        )}
      </section>

      {/* Abgelehnt */}
      <section>
        <h2 style={{ color: '#dc3545', marginBottom: 20 }}>
          ✗ Abgelehnt ({rejected.length})
        </h2>
        {rejected.length > 0 ? (
          rejected.map(action => (
            <SubmittedActionCard
              key={action.id}
              action={action}
              onApprove={() => {}}
              onReject={() => {}}
            />
          ))
        ) : (
          <p style={{ color: '#999' }}>Keine abgelehnten Handlungen</p>
        )}
      </section>
    </div>
  );
};

export default PastAndRewards;