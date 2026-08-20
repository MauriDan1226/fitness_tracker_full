import { useMemo, useState } from 'react';
import { useData } from '../contexts/DataContext';
import { WORKOUT_TYPES, findWorkoutType } from '../utils/constants';
import { formatDuration, formatNumber } from '../utils/format';
import WorkoutCard from '../components/WorkoutCard';
import WorkoutForm from '../components/WorkoutForm';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import Loader from '../components/Loader';
import Message from '../components/Message';

function Workouts() {
  const { workouts, isLoading, loadError, addWorkout, editWorkout, removeWorkout } = useData();
  const [filter, setFilter] = useState('all');
  const [editing, setEditing] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState('');

  // solo se ofrecen como filtro los tipos que el usuario ha registrado
  const usedTypes = useMemo(() => {
    const types = new Set(workouts.map((workout) => workout.type));
    return WORKOUT_TYPES.filter((type) => types.has(type.value));
  }, [workouts]);

  const visibleWorkouts = useMemo(
    () => (filter === 'all' ? workouts : workouts.filter((workout) => workout.type === filter)),
    [workouts, filter],
  );

  const totals = useMemo(
    () =>
      visibleWorkouts.reduce(
        (acc, workout) => ({
          minutes: acc.minutes + workout.duration,
          calories: acc.calories + workout.calories,
        }),
        { minutes: 0, calories: 0 },
      ),
    [visibleWorkouts],
  );

  const openCreateForm = () => {
    setEditing(null);
    setFormError('');
    setIsFormOpen(true);
  };

  const openEditForm = (workout) => {
    setEditing(workout);
    setFormError('');
    setIsFormOpen(true);
  };

  const handleSubmit = async (values) => {
    setIsSaving(true);
    setFormError('');

    try {
      if (editing) {
        await editWorkout(editing._id, values);
      } else {
        await addWorkout(values);
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
      await removeWorkout(deleting._id);
      setDeleting(null);
    } catch (error) {
      setFormError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="workouts">
      <div className="section-head">
        <div className="section-head__row">
          <div>
            <h1 className="section-head__title">Entrenamientos</h1>
            <p className="section-head__subtitle">
              {formatNumber(visibleWorkouts.length)} sesiones · {formatDuration(totals.minutes)} ·{' '}
              {formatNumber(totals.calories)} kcal
            </p>
          </div>
          <button className="button button_primary" type="button" onClick={openCreateForm}>
            + Registrar entrenamiento
          </button>
        </div>
      </div>

      <Message text={loadError} />

      {usedTypes.length > 1 && (
        <div className="workouts__filters">
          <button
            className={`filter-chip ${filter === 'all' ? 'filter-chip_active' : ''}`}
            type="button"
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          {usedTypes.map((type) => (
            <button
              key={type.value}
              className={`filter-chip ${filter === type.value ? 'filter-chip_active' : ''}`}
              type="button"
              onClick={() => setFilter(type.value)}
            >
              {type.icon} {type.label}
            </button>
          ))}
        </div>
      )}

      {isLoading ? (
        <Loader text="Cargando tus entrenamientos..." />
      ) : visibleWorkouts.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon">🏃</span>
          <p className="empty-state__text">
            {workouts.length === 0
              ? 'Todavia no has registrado ningun entrenamiento. Anota el primero y empieza a ver tu progreso.'
              : `No hay sesiones de ${findWorkoutType(filter).label} registradas.`}
          </p>
          <button className="button button_primary" type="button" onClick={openCreateForm}>
            Registrar entrenamiento
          </button>
        </div>
      ) : (
        <div className="workout-list">
          {visibleWorkouts.map((workout) => (
            <WorkoutCard
              key={workout._id}
              workout={workout}
              onEdit={openEditForm}
              onDelete={setDeleting}
            />
          ))}
        </div>
      )}

      <Modal
        title={editing ? 'Editar entrenamiento' : 'Nuevo entrenamiento'}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      >
        <WorkoutForm
          key={editing ? editing._id : 'new'}
          workout={editing}
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
          isSaving={isSaving}
          error={formError}
        />
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleting)}
        title="Eliminar entrenamiento"
        text="Esta sesion se borrara de tu historial y no se puede recuperar."
        onConfirm={handleDelete}
        onClose={() => setDeleting(null)}
        isBusy={isSaving}
      />
    </section>
  );
}

export default Workouts;
