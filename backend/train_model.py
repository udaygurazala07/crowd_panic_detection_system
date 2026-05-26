import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
import joblib

# Load dataset
df = pd.read_csv('crowd_panic_dataset.csv')

# Encode text values
le_density = LabelEncoder()
le_weather = LabelEncoder()
le_time = LabelEncoder()

df['crowd_density'] = le_density.fit_transform(df['crowd_density'])
df['weather'] = le_weather.fit_transform(df['weather'])
df['time_of_day'] = le_time.fit_transform(df['time_of_day'])

# Features and target
X = df.drop('emergency', axis=1)
y = df['emergency']

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Train model
model = LogisticRegression()
model.fit(X_train, y_train)

# Accuracy
accuracy = model.score(X_test, y_test)

print("Model Accuracy:", accuracy)

# Save model
joblib.dump(model, 'logistic_model.pkl')

# Save encoders
joblib.dump(le_density, 'density_encoder.pkl')
joblib.dump(le_weather, 'weather_encoder.pkl')
joblib.dump(le_time, 'time_encoder.pkl')

print("Model Saved Successfully")