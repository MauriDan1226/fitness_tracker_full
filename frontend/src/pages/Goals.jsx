import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import GoalCard from '../components/GoalCard';
import GoalForm from '../components/GoalForm';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import Loader from '../components/Loader';
import Icon from '../components/Icon';
import Message from '../components/Message';

function Goals() {
  const { goals, isLoading, loadError, addGoal, editGoal, removeGoal } = useData();
  const [editing, setEditing] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const completed = goals.filter((goal) => goal.progress.percent >= 100).length;

  const openCreateForm = () => {
    setEditing(null);
    setFormError('');
    setIsFormOpen(true);
  };

  const openEditForm = (goal) => {
    setEditing(goal);
    setFormError('');
    setIsFormOpen(true);
  };

  const handleSubmit = async (values) => {
    setIsSaving(true);
    setFormError('');

    try {
      if (editing) {
        await editGoal(editing._id, values);
      } else {
        await addGoal(values);
      }
      setIsFormOpen(false);
      setEditing(null);
    } catch (error) {
      setFormError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsSaving(true);
    try {
      await removeGoal(deleting._id);
      setDeleting(null);
    } catch (error) {
      setFormError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="goals">
      <div className="section-head">
        <div className="section-head__row">
          <div>
            <h1 className="section-head__title">Mis metas</h1>
            <p className="section-head__subtitle">
              {goals.length} activas · {completed} conseguidas
            </p>
          </div>
          <button className="button button_primary" type="button" onClick={openCreateForm}>
            <Icon name="plus" size={16} />
            Nueva meta
          </button>
        </div>
      </div>

      <Message text={loadError} />

      {isLoading ? (
        <Loader text="Cargando tus metas..." />
      ) : goals.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon"><Icon name="target" size={28} /></span>
          <p className="empty-state__text">
            Todavia no tienes metas. Define un objetivo de peso, de minutos o de calorias y la
            aplicacion calculara tu avance automaticamente.
          </p>
          <button className="button button_primary" type="button" onClick={openCreateForm}>
            Crear mi primera meta
          </button>
        </div>
      ) : (
        <div className="goal-grid">
          {goals.map((goal) => (
            <GoalCard key={goal._id} goal={goal} onEdit={openEditForm} onDelete={setDeleting} />
          ))}
        </div>
      )}

      <Modal
        title={editing ? 'Editar meta' : 'Nueva meta'}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      >
        <GoalForm
          key={editing ? editing._id : 'new'}
          goal={editing}
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
          isSaving={isSaving}
          error={formError}
        />
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleting)}
        title="Eliminar meta"
        text="La meta y su progreso desapareceran de tu lista."
        onConfirm={handleDelete}
        onClose={() => setDeleting(null)}
        isBusy={isSaving}
      />
    </section>
  );
}

export default Goals;
