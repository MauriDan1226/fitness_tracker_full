import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as api from '../utils/api';
import { useAuth } from './AuthContext';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const { token, isLoggedIn } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [goals, setGoals] = useState([]);
  const [tips, setTips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState('');

  // el avance de las metas y los consejos se calculan en el servidor,
  // asi que se vuelven a pedir cada vez que cambia la actividad
  const refreshGoals = useCallback(async () => {
    const data = await api.getGoals(token);
    setGoals(data);
    return data;
  }, [token]);

  const refreshTips = useCallback(async () => {
    const data = await api.getTips(token);
    setTips(data);
    return data;
  }, [token]);

  useEffect(() => {
    if (!isLoggedIn) {
      setWorkouts([]);
      setGoals([]);
      setTips([]);
      return;
    }

    setIsLoading(true);
    setLoadError('');

    Promise.all([api.getWorkouts(token), api.getGoals(token), api.getTips(token)])
      .then(([workoutList, goalList, tipList]) => {
        setWorkouts(workoutList);
        setGoals(goalList);
        setTips(tipList);
      })
      .catch((error) => setLoadError(error.message))
      .finally(() => setIsLoading(false));
  }, [isLoggedIn, token]);

  const addWorkout = useCallback(
    async (workout) => {
      const created = await api.createWorkout(workout, token);
      setWorkouts((current) =>
        [created, ...current].sort((a, b) => new Date(b.date) - new Date(a.date)),
      );
      await Promise.all([refreshGoals(), refreshTips()]);
      return created;
    },
    [token, refreshGoals, refreshTips],
  );

  const editWorkout = useCallback(
    async (id, updates) => {
      const updated = await api.updateWorkout(id, updates, token);
      setWorkouts((current) =>
        current
          .map((workout) => (workout._id === id ? updated : workout))
          .sort((a, b) => new Date(b.date) - new Date(a.date)),
      );
      await Promise.all([refreshGoals(), refreshTips()]);
      return updated;
    },
    [token, refreshGoals, refreshTips],
  );

  const removeWorkout = useCallback(
    async (id) => {
      await api.deleteWorkout(id, token);
      setWorkouts((current) => current.filter((workout) => workout._id !== id));
      await Promise.all([refreshGoals(), refreshTips()]);
    },
    [token, refreshGoals, refreshTips],
  );

  const addGoal = useCallback(
    async (goal) => {
      const created = await api.createGoal(goal, token);
      setGoals((current) => [created, ...current]);
      return created;
    },
    [token],
  );

  const editGoal = useCallback(
    async (id, updates) => {
      const updated = await api.updateGoal(id, updates, token);
      setGoals((current) => current.map((goal) => (goal._id === id ? updated : goal)));
      return updated;
    },
    [token],
  );

  const removeGoal = useCallback(
    async (id) => {
      await api.deleteGoal(id, token);
      setGoals((current) => current.filter((goal) => goal._id !== id));
    },
    [token],
  );

  const value = useMemo(
    () => ({
      workouts,
      goals,
      tips,
      isLoading,
      loadError,
      addWorkout,
      editWorkout,
      removeWorkout,
      addGoal,
      editGoal,
      removeGoal,
      refreshGoals,
      refreshTips,
    }),
    [
      workouts,
      goals,
      tips,
      isLoading,
      loadError,
      addWorkout,
      editWorkout,
      removeWorkout,
      addGoal,
      editGoal,
      removeGoal,
      refreshGoals,
      refreshTips,
    ],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData debe usarse dentro de DataProvider');
  }
  return context;
}
