# Linear classifiers: instructor guide

18 questions; one best answer per question. All logarithms are natural.
Suggested use: approximately 20–25 minutes with explanation review.

The interactive format follows the existing Bayes and MLP quizzes.
Slide references use titles so that changing slide numbers does not invalidate them.

**Instructor correction:** On “Logistic regression - gradient ascent”,
the log-likelihood is concave, not convex. Its negative is convex.
The quiz uses the correct statement; the course source is unchanged.

## Answer key

| Question | Answer | Section |
|---|---|---|
| 1 | C | Linear boundaries & LDA |
| 2 | A | Linear boundaries & LDA |
| 3 | D | Linear boundaries & LDA |
| 4 | B | Linear boundaries & LDA |
| 5 | A | Linear boundaries & LDA |
| 6 | C | Linear boundaries & LDA |
| 7 | B | Indicators & logistic regression |
| 8 | D | Indicators & logistic regression |
| 9 | A | Indicators & logistic regression |
| 10 | C | Indicators & logistic regression |
| 11 | D | Indicators & logistic regression |
| 12 | B | Indicators & logistic regression |
| 13 | A | Learning & softmax |
| 14 | C | Learning & softmax |
| 15 | B | Learning & softmax |
| 16 | D | Learning & softmax |
| 17 | A | Learning & softmax |
| 18 | B | Learning & softmax |

## 1. Linear boundaries & LDA — Concept

Two classes use affine scores f_0(x) = β_{00} + β_0^T x and f_1(x) = β_{01} + β_1^T x, with β_0 ≠ β_1. What is the set where their scores are equal?

- **A.** An ellipsoid centred at the mean of the observations.
- **B.** A hyperplane that must pass through the origin.
- **C.** A hyperplane with normal vector β_1 − β_0; the intercepts determine its offset.
- **D.** A sigmoid curve because the task is classification.

**Answer: C.**

Equating the scores gives (β_1 − β_0)^T x = β_{00} − β_{01}. This is a hyperplane because the normal is nonzero. An intercept allows it to move away from the origin. With more than two affine scores, the full decision boundary consists of pieces of pairwise equality hyperplanes.

**Check it:** Use f_0 = −x_1 + 0.6x_2 + 0.4 and f_1 = x_1 − 0.6x_2 − 0.4. Answer: the boundary is x_1 − 0.6x_2 = 0.4; at (0,0), class 0 has the larger score.

**Revisit the chapter:** Linear methods for classification; Affine scores and the decision boundary.

## 2. Linear boundaries & LDA — Concept

Which statement correctly distinguishes LDA from logistic regression?

- **A.** LDA models Gaussian class-conditional densities and class priors; logistic regression models the binary posterior probability directly.
- **B.** Both require the input features in each class to have a Gaussian distribution.
- **C.** LDA models only the posterior; logistic regression must estimate a separate covariance matrix for each class.
- **D.** LDA is discriminative and logistic regression is generative.

**Answer: A.**

LDA is a generative model: it describes p(x | y=k), using a shared covariance, and P(y=k), then applies Bayes’ rule. Logistic regression is discriminative: it specifies P(y=1 | x) without requiring Gaussian class-conditionals. The two methods can produce similar posterior forms but need not produce identical fitted parameters on a finite dataset.

**Check it:** Does a logistic classifier become invalid solely because the input distribution is non-Gaussian? Answer: no. Its modeling assumption concerns the conditional class probability, not a Gaussian density for x.

**Revisit the chapter:** Linear classifiers: Outline; Linear discriminant analysis; Logistic regression.

## 3. Linear boundaries & LDA — Concept

Why do Gaussian class-conditionals with a common positive-definite covariance matrix Σ lead to affine LDA discriminant scores?

- **A.** A Gaussian density is itself an affine function of x.
- **B.** The covariance must be diagonal, making all squared terms zero.
- **C.** All class priors must be equal, so all terms involving x disappear.
- **D.** After taking logarithms, the term −½x^{T} Σ^{−1} x is common to all classes and cancels in score comparisons.

**Answer: D.**

Expanding the Gaussian log-density leaves a common quadratic term plus μ_k^{T} Σ^{−1} x − ½μ_k^{T} Σ^{−1} μ_k + log P_k. Removing terms common to every class preserves the winning class. The remaining score is affine in x. The shared covariance may contain correlations, and priors need not be equal.

**Check it:** For distinct class means, what can change if a shared covariance has nonzero off-diagonal entries? Answer: the boundary can rotate, but remains a hyperplane.

**Revisit the chapter:** Linear discriminant analysis; Gaussian geometry: when is the boundary linear?.

## 4. Linear boundaries & LDA — Calculation

In one-dimensional LDA, μ_0 = −1, μ_1 = 1 and the common variance is 1. The priors are P_0 = 3/4 and P_1 = 1/4. With equal error costs, when should the classifier choose class 1 (away from a tie)?

- **A.** Whenever x > 0; priors do not affect an LDA boundary.
- **B.** Whenever x > ½ log 3 ≈ 0.549.
- **C.** Whenever x > −½ log 3 ≈ −0.549.
- **D.** Whenever x < ½ log 3 ≈ 0.549.

**Answer: B.**

The score difference is δ_1(x) − δ_0(x) = 2x + log(P_1/P_0) = 2x − log 3. Class 1 wins when this is positive. Increasing the prior of class 0 expands its decision region: class 1 needs stronger feature evidence to overcome its lower prior.

**Check it:** Classify x = 0.4. Answer: class 0, because 0.4 < 0.549. With equal priors the boundary would be 0 and the same observation would be assigned to class 1.

**Revisit the chapter:** Linear discriminant analysis.

## 5. Linear boundaries & LDA — Concept

If Gaussian classes are allowed different positive-definite covariance matrices, what generally happens to the pairwise decision boundary?

- **A.** The quadratic terms generally no longer cancel, giving a quadratic decision boundary (QDA).
- **B.** It remains a hyperplane for every choice of means and covariances.
- **C.** It must be a circle, regardless of the covariance matrices.
- **D.** It becomes impossible to compute posterior class probabilities.

**Answer: A.**

With class-specific covariance matrices, both the quadratic forms and the log-determinant terms can differ between classes. Their score difference is generally quadratic in x. Particular parameter choices can produce special or degenerate boundaries, so “always a curved ellipse” would be too strong.

**Check it:** If the covariance matrices become equal again, does the QDA comparison reduce to LDA? Answer: yes; the class-dependent quadratic terms cancel.

**Revisit the chapter:** Gaussian geometry: when is the boundary linear?; Linear discriminant analysis.

## 6. Linear boundaries & LDA — Calculation

A training set has n = 20 observations, K = 3 nonempty classes and p = 18 features. Which statement about the pooled within-class covariance Σ̂ is correct?

- **A.** It must be invertible because n > p.
- **B.** It has rank exactly 18, so no regularization is needed.
- **C.** Its rank is at most n − K = 17, so it is singular; Σ̂ + λI is positive definite for λ > 0.
- **D.** Subtracting λI, with any λ > 0, always makes it positive definite.

**Answer: C.**

Subtracting each class mean leaves at most n − K independent within-class residual directions. Thus rank(Σ̂) ≤ min(p,n − K) = 17 < 18. Since a covariance matrix is positive semidefinite, adding λI shifts every eigenvalue by a positive amount and makes the result invertible.

**Check it:** Would p = 10 guarantee invertibility for the same n and K? Answer: no. Redundant or constant features can still make the covariance singular.

**Revisit the chapter:** Linear discriminant analysis; Regularized covariance estimation in LDA.

## 7. Indicators & logistic regression — Calculation

Eight observations have identical inputs. Their class-1 indicators contain three ones and five zeros. What constant prediction minimizes the sum of squared errors?

- **A.** 0, because class 0 is the majority.
- **B.** 3/8.
- **C.** 1/2, because there are two classes.
- **D.** 5/8.

**Answer: B.**

The objective is 5p² + 3(1−p)². Setting its derivative to zero gives 16p − 6 = 0, hence p = 3/8. The optimal squared-error prediction is the sample mean of the indicators, not the most frequent hard label. At population level, the unrestricted conditional squared-error minimizer is E[Y | x] = P(Y=1 | x).

**Check it:** Using a threshold of 0.5, what hard class is predicted? Answer: class 0. Distinguish the fitted score 3/8 from the predicted class label 0.

**Revisit the chapter:** One hot encoding; Training indicator variable with constant input.

## 8. Indicators & logistic regression — Concept

Fit both binary class indicators by unregularized ordinary least squares, using the same full-column-rank design matrix with an intercept. Which statement holds for the two fitted functions?

- **A.** Both fitted scores must lie between 0 and 1 at every input.
- **B.** The fitted functions are equal because both labels are binary.
- **C.** Their sum must be zero because the centered indicators are opposites.
- **D.** They satisfy f_1(x) = 1 − f_0(x), although individual scores can be outside [0,1].

**Answer: D.**

The target vectors satisfy y_1 = 1 − y_0. Least-squares fitting is linear in the target, and the intercept fits the constant-one vector exactly. Full column rank gives unique coefficient vectors, so the complementary relationship holds for every input. The sum-to-one property does not impose nonnegativity or upper bounds on each score.

**Check it:** If f_0(x) = 1.2, what are f_1(x) and the predicted class? Answer: f_1(x) = −0.2, and class 0 wins. These are valid discriminant scores but not valid probabilities.

**Revisit the chapter:** Linear regression of indicator variables: Binary case; Least-squares regression of class indicators.

## 9. Indicators & logistic regression — Concept

A binary classifier uses the score s(x) = β_0 + β_1 x + β_2 x² and predicts class 1 when s(x) > 0. How should this model be described?

- **A.** It is linear in its coefficients and in the transformed features (1,x,x²), but can have nonlinear decision regions in the original input.
- **B.** It is necessarily nonlinear in its coefficients because x is squared.
- **C.** It can have only one decision-boundary point on the real line.
- **D.** It becomes a linear function of the original x whenever a sigmoid is applied to the score.

**Answer: A.**

The unknown coefficients enter as a linear combination of fixed features. This differs from being affine in the original input x. For example, s(x) = x² − 1 is positive outside the interval [−1,1] and negative inside it; its two boundary points are x = −1 and x = 1.

**Check it:** Would replacing the threshold on s by a threshold of 0.5 on g(s) change those boundary points? Answer: no, because g is strictly increasing and g(0) = 0.5.

**Revisit the chapter:** Linear classifiers: Outline; Regression with more flexible models; Logistic regression with more flexible models.

## 10. Indicators & logistic regression — Calculation

A logistic model uses P(y=1 | x) = g(−2+x), with g(s) = 1/(1+exp(−s)). What are the probability at x = 3 and the decision boundary for a probability threshold of 0.5?

- **A.** Probability ≈ 0.269; boundary x = 2.
- **B.** Probability = 1; boundary x = 0.5.
- **C.** Probability ≈ 0.731; boundary x = 2.
- **D.** Probability ≈ 0.731; boundary x = −2.

**Answer: C.**

At x = 3, the score is −2 + 3 = 1, so the probability is g(1) ≈ 0.731. The threshold 0.5 corresponds to score zero, giving x = 2. The probability is nonlinear in x, while the decision boundary is determined by the affine score.

**Check it:** Find the probability at x = 1. Answer: g(−1) ≈ 0.269, which equals 1 − g(1). The model predicts class 0 there.

**Revisit the chapter:** Logistic regression; Logistic regression on overlapping classes.

## 11. Indicators & logistic regression — Concept

A single neuron computes an affine weighted sum of the input features and then applies a sigmoid. What is its relationship to binary logistic regression?

- **A.** Its sigmoid output is already a hard class label, so no threshold is needed.
- **B.** It is equivalent only if the input features are Gaussian.
- **C.** It always has the same training objective, regardless of which loss is used.
- **D.** It has the same probability map; training with binary cross-entropy and matching regularization gives the same objective.

**Answer: D.**

Both compute g(β_0 + ∑_j β_j x_j). The output represents a class probability; a separate threshold produces a hard label. Matching the probability map alone does not specify the loss. Binary cross-entropy matches logistic negative log-likelihood. A classical hard-threshold perceptron is a different model/training combination.

**Check it:** Could the sigmoid neuron instead be trained using squared error? Answer: yes, but this generally gives a different objective from logistic maximum likelihood, and the loss need not be convex in the coefficients.

**Revisit the chapter:** Logistic regression as a sigmoid neuron; Logistic regression - gradient ascent.

## 12. Indicators & logistic regression — Calculation

For one observation with y = 1 and predicted probability p = P(y=1 | x) = 0.1, what is the binary cross-entropy loss, using natural logarithms?

- **A.** −log(0.9) ≈ 0.105.
- **B.** −log(0.1) ≈ 2.303.
- **C.** (1−0.1)² = 0.81.
- **D.** log(0.1) ≈ −2.303.

**Answer: B.**

Binary cross-entropy is −y log p − (1−y)log(1−p). When y = 1, only −log p remains. Assigning a low probability to the true label incurs a large positive loss. As p approaches zero, this loss grows without bound. The summed loss is the negative conditional log-likelihood for independent observations.

**Check it:** Keep p = 0.1 but change the true label to y = 0. Answer: the loss becomes −log(0.9) ≈ 0.105; the same prediction is now confidently correct.

**Revisit the chapter:** Binary cross-entropy for one training example; Logistic regression: learning.

## 13. Learning & softmax — Calculation

For one logistic-regression observation, the augmented input is x = (1,2)^T, y = 1 and the current predicted probability is 0.25. With learning rate γ = 0.1, what increment Δβ does one unregularized log-likelihood gradient-ascent step add?

- **A.** Δβ = (0.075, 0.150)^T.
- **B.** Δβ = (−0.075, −0.150)^T.
- **C.** Δβ = (0.025, 0.050)^T.
- **D.** Δβ = (0.750, 1.500)^T.

**Answer: A.**

For one observation, ∇ℓ = (y−p)x = 0.75(1,2)^T = (0.75,1.5)^T. Gradient ascent adds γ∇ℓ, giving (0.075,0.15)^T. The first component updates the intercept because the first augmented feature is 1. Gradient descent on negative log-likelihood produces the same increment.

**Check it:** Using the same current model and input but y = 0, find the increment. Answer: 0.1(0−0.25)(1,2)^T = (−0.025,−0.05)^T.

**Revisit the chapter:** Logistic regression - gradient ascent; Log-likelihood gradient.

## 14. Learning & softmax — Concept

For standard binary logistic regression with fixed input features, which statement about the unregularized objective is correct?

- **A.** The log-likelihood is convex, so gradient ascent always converges for any positive learning rate.
- **B.** The negative log-likelihood is concave, and every dataset has a unique finite minimizer.
- **C.** The log-likelihood is concave and its negative is convex; this alone does not guarantee a finite or unique optimum.
- **D.** The sigmoid makes the negative log-likelihood nonconvex in the coefficients for every dataset.

**Answer: C.**

The log-likelihood Hessian is −X^T W X, where W has nonnegative entries p_i(1−p_i) on its diagonal. It is negative semidefinite, so ℓ is concave and −ℓ is convex. Rank deficiencies can prevent uniqueness, and separation can prevent a finite optimum. A suitable learning-rate rule is still needed for iterative optimization.

**Check it:** Does concavity rule out spurious local maxima while also guaranteeing that a maximum is attained? Answer: it rules out nonglobal local maxima, but does not guarantee attainment on an unbounded parameter space.

**Revisit the chapter:** Logistic regression - gradient ascent; Linearly separable logistic regression.

## 15. Learning & softmax — Concept

Fit P(y=1 | x) = g(cx), c > 0, with no intercept, to (−1,0) and (1,1). As c increases, which statement describes the unregularized fit?

- **A.** The classification boundary moves farther from zero until both observations become correct.
- **B.** Training error is already zero for every c > 0, while the log-likelihood increases toward 0 without attaining it at any finite c.
- **C.** The log-likelihood reaches its maximum as soon as the training classification error becomes zero.
- **D.** The log-likelihood grows without bound toward positive infinity.

**Answer: B.**

The boundary stays at x = 0 and both labels are correctly classified for every positive c. Independence gives L(c) = g(c)² and ℓ(c) = −2 log(1+exp(−c)). For every finite c, ℓ(c) < 0, and ℓ′(c) = 2/(1+exp(c)) > 0. Thus 0 is an unattained supremum, not a finite maximum.

**Check it:** Add λc²/2, λ > 0, to the negative log-likelihood. Is the minimizer finite? Answer: yes. The penalty makes the objective grow as c → ∞; its derivative at 0 is −1 and its second derivative is strictly positive, giving one finite positive minimizer.

**Revisit the chapter:** Linearly separable logistic regression; Linearly separable logistic regression: solution; Exercise: logistic regression on separable data.

## 16. Learning & softmax — Calculation

Three mutually exclusive classes have softmax scores (s_0,s_1,s_2) = (0,log 2,log 3). What are their predicted probabilities?

- **A.** (1/2, 2/3, 3/4).
- **B.** (0, log 2/(log 2+log 3), log 3/(log 2+log 3)).
- **C.** (0, 0, 1).
- **D.** (1/6, 1/3, 1/2).

**Answer: D.**

Exponentiating gives (1,2,3), and the shared denominator is 1+2+3 = 6. The probabilities are therefore (1/6,2/6,3/6), which sum to one. Applying an independent sigmoid to each score would not give this multiclass normalization. The largest probability and largest score both select class 2.

**Check it:** For just two scores s_0 and s_1, express the probability of class 1 using a sigmoid. Answer: p_1 = g(s_1−s_0); it depends on the score difference.

**Revisit the chapter:** Softmax; Softmax: one shared normalization across classes.

## 17. Learning & softmax — Calculation

For one softmax example, the true one-hot label is y = (0,1,0) and the predicted probabilities are p = (0.2,0.5,0.3). What is the gradient of the log-likelihood with respect to the three scores?

- **A.** y − p = (−0.2, 0.5, −0.3).
- **B.** p − y = (0.2, −0.5, 0.3).
- **C.** (0, 2, 0).
- **D.** p = (0.2, 0.5, 0.3).

**Answer: A.**

Combining the softmax derivatives with ℓ = ∑_k y_k log p_k gives ∂ℓ/∂s_j = y_j − p_j. Thus ascent raises the true-class score and lowers the other scores. The negative log-likelihood gradient has the opposite sign. The vector (0,2,0) is instead ∂ℓ/∂p, before applying the softmax chain rule.

**Check it:** What is the cross-entropy loss, and what is the sum of the score-gradient components? Answer: loss = −log 0.5 = log 2, and the components sum to 0.

**Revisit the chapter:** Softmax: learning; Softmax: gradient; Softmax: update.

## 18. Learning & softmax — Concept

A softmax model uses s_k = x^{T} β_k. Add the same vector a to every class coefficient vector: β′_k = β_k + a. What changes?

- **A.** Every class probability increases by the same positive amount.
- **B.** The probabilities are unchanged; a reference-class or sum-to-zero constraint can remove this common-shift redundancy.
- **C.** The predicted class is unchanged, but the probabilities generally change.
- **D.** The probabilities become equal across classes.

**Answer: B.**

Every score gains x^T a, so every exponential gains the common factor exp(x^T a). This factor cancels between numerator and denominator. Different coefficient matrices therefore represent the same probability model. Fixing one class coefficient vector to zero, or imposing a sum-to-zero constraint, removes this redundancy; other issues such as separation or deficient feature rank can still remain.

**Check it:** Would multiplying all scores by 2 have the same effect? Answer: generally no. It preserves their ordering but changes the probabilities, typically making them more concentrated on the largest scores.

**Revisit the chapter:** Softmax identifiability; Softmax identifiability: possible fixes.
